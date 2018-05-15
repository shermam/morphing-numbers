# morphing-numbers
## Morphing Numbers Animation.

The idea is to have the drawing of a digit in the canvas morph into the the drawing of another number with an animation.

To do that I am thinking in four diferent tecniques:

1. Take the pixels that are different in the two images. For each of them find the closest pixel on the second image of the same color. Move the different pixel to the place of the closest pixel place with an animation.

2. This one I saw in a lib that morphed photos. You identify some commom points in the two images. Rotate/strech/shrink the first image so that the common points match the second image. At the same time fade out the first image and fade in the second one.

3. Map a kind of magnetic field around the second picture. The closests pixel places should have higher values and farther places lower values. Then the pixels from the first image should animate following the values in the field map following the ascending order. This one is very similar to the first. Maybe a second way to acomplish the same idea.

4. Maybe try do morph the outline paths of the images while filling them during the animation.

To simplify the tests I am using just black and white pixels for now.
