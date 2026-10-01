"""Import the 21 publicly shared Class 8 PDFs without altering their contents."""

from concurrent.futures import ThreadPoolExecutor, as_completed
from hashlib import sha256
import json
from pathlib import Path
import subprocess
import time

import gdown


ROOT = Path(__file__).resolve().parents[2]
BOOK_DIR = ROOT / "public/nctb/2026/class-8"
manifest = json.loads((ROOT / ".github/class8-books-import.json").read_text())
assert len(manifest) == 21, "Expected exactly 21 non-Science books"
assert len({book["id"] for book in manifest}) == 21, "Duplicate subject"
assert all(book["id"] != "science" for book in manifest), "Science is excluded"
science_hash = sha256((BOOK_DIR / "science.pdf").read_bytes()).hexdigest()


def import_book(book):
    destination = ROOT / book["destination"]
    assert destination.parent == BOOK_DIR
    assert destination.name == book["id"] + ".pdf"
    assert not destination.exists(), f"Already uploaded: {book['id']}"
    temporary = destination.with_suffix(".pdf.part")
    for attempt in range(3):
        try:
            temporary.unlink(missing_ok=True)
            gdown.download(
                id=book["driveId"],
                output=str(temporary),
                quiet=True,
                use_cookies=False,
            )
            assert temporary.stat().st_size == book["sourceBytes"], "Incomplete download"
            with temporary.open("rb") as stream:
                assert stream.read(5) == b"%PDF-", "Download is not a PDF"
            info = subprocess.run(
                ["pdfinfo", str(temporary)],
                capture_output=True,
                text=True,
                check=True,
                timeout=60,
            ).stdout
            pages = int(next(line.split(":", 1)[1] for line in info.splitlines() if line.startswith("Pages:")))
            assert pages > 0, "Empty PDF"
            digest = sha256(temporary.read_bytes()).hexdigest()
            temporary.replace(destination)
            print(f"Verified {book['id']}: {pages} pages, {destination.stat().st_size} bytes, SHA256 {digest}", flush=True)
            return book["id"], pages
        except Exception:
            if attempt == 2:
                raise
            time.sleep(3 * (attempt + 1))


with ThreadPoolExecutor(max_workers=3) as executor:
    jobs = [executor.submit(import_book, book) for book in manifest]
    results = [job.result() for job in as_completed(jobs)]

assert len(results) == 21
assert sha256((BOOK_DIR / "science.pdf").read_bytes()).hexdigest() == science_hash
print("All 21 Class 8 books verified. Existing Science PDF is unchanged.", flush=True)
