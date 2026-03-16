# Travel Post Template

Use this file as the source of truth when creating new travel blog posts in this folder.

## Future request format

You can say:

- `Create a new empty travel blog based on template.md`
- `Based on template.md in features/posts create a new empty post with 6 paragraphs and 4 photo slots`
- `Create a new empty travel post called Lisbon Weekend based on template.md`

When that request is made, create:

1. A new post module in this folder.
2. A matching image folder in [client/public/travel](/Users/tejaswinigude/Desktop/portfolio/client/public/travel) using the post slug.
3. An export/import entry in [index.js](/Users/tejaswinigude/Desktop/portfolio/client/src/features/travel/posts/index.js).
4. An empty, ready-to-fill structure that matches the current app shape.

Do not change the travel page flow, route format, or data shape unless explicitly asked.

## File naming rules

- File name: use `camelCase.js`
- Export: default export
- Slug: lowercase kebab-case
- Store that post's images in `client/public/travel/<post-slug>/`
- Keep the object shape consistent with existing posts in this folder

Example file names:

- `lisbonWeekend.js`
- `tokyoInSpring.js`
- `weekendInMontreal.js`

## Required post shape

Every post file should export one object in this shape:

```js
const examplePost = {
  id: "post-slug",
  slug: "post-slug",
  title: "Post Title",
  city: "City Name",
  dateLabel: "",
  coverImage: "",
  summary: "",
  body: `## Heading

Paragraph 1.

Paragraph 2.`,
  gallery: [],
  displayOrder: 0
};

export default examplePost;
```

## Body format rules

The app parses the `body` string directly.

- Separate paragraphs with a blank line
- Use `## Heading` for section headings
- Use `[image:filename.jpg|Caption text.]` for inline story photos
- Optional image variant format:
  `[image:filename.jpg|Caption text.|crop-portrait]`
- Side-by-side inline photo format:
  use consecutive blocks with `side-by-side`, for example
  `[image:travel/new-post-slug/photo-1.jpg||side-by-side]`
  and
  `[image:travel/new-post-slug/photo-2.jpg||side-by-side]`
- Stacked slider photo format:
  use consecutive blocks with `stack`, for example
  `[image:travel/new-post-slug/photo-1.jpg||stack]`
  `[image:travel/new-post-slug/photo-2.jpg||stack]`
  `[image:travel/new-post-slug/photo-3.jpg||stack]`
- Inline image filenames should point to files in that post's folder inside [client/public/travel](/Users/tejaswinigude/Desktop/portfolio/client/public/travel)

## Gallery format rules

The bottom gallery grid uses `gallery`.

Use this shape:

```js
gallery: [
  { slot: 0, url: "photo-1.jpg", alt: "Description of photo 1" },
  { slot: 1, url: "photo-2.jpg", alt: "Description of photo 2" }
]
```

Rules:

- `slot` should start at `0`
- `url` should match a file placed in that post's folder inside [client/public/travel](/Users/tejaswinigude/Desktop/portfolio/client/public/travel)
- `alt` should describe the image clearly
- If no gallery is needed yet, use `gallery: []`

## Cover image rules

- `coverImage` is used on the travel blog card grid
- Use a filename from that post's folder inside [client/public/travel](/Users/tejaswinigude/Desktop/portfolio/client/public/travel)
- If you do not want a cover yet, leave it as an empty string

Example:

```js
coverImage: "travel/lisbon-weekend/cover.jpg",
```

## What to generate for an empty post

When asked to create an empty post from this template:

1. Create the new post file in this folder.
2. Create the matching folder in [client/public/travel](/Users/tejaswinigude/Desktop/portfolio/client/public/travel) using the post slug.
3. Add the import/export in [index.js](/Users/tejaswinigude/Desktop/portfolio/client/src/features/travel/posts/index.js).
4. Fill `body` with the requested number of empty paragraph placeholders.
5. Add the requested number of photo slots in two places if asked:
   - inline body image markers
   - `gallery` slots
6. Keep everything else minimal and editable.

## Empty paragraph placeholder format

Use this exact format inside `body`:

```txt
[Paragraph 1]

[Paragraph 2]

[Paragraph 3]
```

If section headings are requested, use:

```txt
## Section 1

[Paragraph 1]
```

## Empty inline photo placeholder format

Use this exact format inside `body`:

```txt
[image:travel/new-post-slug/photo-1.jpg|Add caption for photo 1.]
```

For multiple requested inline photos:

```txt
[image:travel/new-post-slug/photo-1.jpg|Add caption for photo 1.]

[image:travel/new-post-slug/photo-2.jpg|Add caption for photo 2.]
```

## Empty gallery placeholder format

Use this exact format:

```js
gallery: [
  { slot: 0, url: "travel/new-post-slug/photo-1.jpg", alt: "Add alt text for photo 1" },
  { slot: 1, url: "travel/new-post-slug/photo-2.jpg", alt: "Add alt text for photo 2" }
]
```

## Copy-paste starter

```js
const newTravelPost = {
  id: "new-post-slug",
  slug: "new-post-slug",
  title: "New Post Title",
  city: "City Name",
  dateLabel: "",
  coverImage: "travel/new-post-slug/cover.jpg",
  summary: "",
  body: `[Paragraph 1]

[Paragraph 2]

[image:travel/new-post-slug/photo-1.jpg|Add caption for photo 1.]`,
  gallery: [
    { slot: 0, url: "travel/new-post-slug/photo-1.jpg", alt: "Add alt text for photo 1" }
  ],
  displayOrder: 0
};

export default newTravelPost;
```
