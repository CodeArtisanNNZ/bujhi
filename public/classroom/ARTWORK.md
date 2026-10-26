# Bujhi classroom illustrations

Created with the built-in image-generation tool. The warm palette and clothing
use the existing classroom illustration as a style reference. Original artwork
is preserved; the site uses the optimized WebP assets in this directory.

- teacher.webp: recognizable Bangladeshi woman in an ivory sari with a burgundy
  border, holding a brown lesson book and extending her hand in a teaching gesture.
- window.webp: front-on honey-colored timber classroom window, open casements,
  detailed greenery, school courtyard, and morning sunlight.
- pupil-0/1/2-front.webp and pupil-0/1/2-back.webp: matching front and back views
  of a boy in a white school shirt, a girl with braids in burgundy uniform, and a
  girl in an ivory hijab and burgundy uniform. All have transparent silhouettes.
- ../mascot/bujhi-pointer-320.webp and bujhi-pointer-640.webp: Bujhi with a shorter,
  more upright pointer, preserving her glasses, face, shirt, hands, and feet.

## Generation briefs

Teacher: A refined, warm painterly storybook illustration of a recognizable
Bangladeshi woman around 35, clearly drawn eyes, brows, nose and kind smile, dark
hair in a low bun, ivory sari with deep burgundy border and matching blouse.
Full body, natural anatomy and fingers, closed brown book at her waist, other
hand extended in a natural teaching gesture. Genuine alpha transparency, narrow
padding, no classroom background or lettering. Face readable at thumbnail size.

Window: A detailed front-on portrait timber window with open casements, slender
mullions, clear panes, mature green trees and a school courtyard beyond.
Honey-colored wood grain, hinges, leaf detail and dappled morning light.
Match the classroom's warm storybook realism; no people, labels or schematic
geometric foliage.

Pupils: One transparent 3-column by 2-row atlas. The top row shows front views
of the boy, braided girl and hijab-wearing girl; the bottom row shows the same
three from behind. Head-to-waist seated poses, natural hands, warm brown skin,
clear faces, ivory/burgundy school uniforms, generous transparent gutters,
no desk, chair, background or cell labels.

Pointer edit: Preserve Bujhi's identity, canvas proportions and character pose.
Shorten the exposed wooden pointer by about one third and make it more upright,
keeping its lower end in the existing hand. Move its rounded tip toward 84% of
canvas width and 14% of canvas height. Retain actual transparency and the original
character's white head, black glasses, red shirt and light-bulb emblem.

## Animation

app/register/classroomArt.ts prepares twelve transparent teacher frames with a
small, shoulder-anchored hand gesture and breathing motion. Eight window frames
move the central foliage slightly while retaining the timber frame. Prepared
frames are reused by the existing turning camera. The renderer also adds very
subtle student motion and projects image textures onto the room's window planes.

The animation pauses in background tabs and becomes still when reduced motion
is requested. The twelve world-space seat positions and signup routes are kept.
