import { useState } from "react";

import { resolveTravelAssetUrl } from "./travelMedia";
import { parseTravelStoryBlocks } from "./travelStoryBlocks";

function getStackCardState(index, activeIndex, total) {
  const offset = (index - activeIndex + total) % total;

  if (offset === 0) {
    return "is-current";
  }

  if (offset === 1) {
    return "is-next";
  }

  if (offset === 2) {
    return "is-later";
  }

  return "is-hidden";
}

function TravelInlineStack({ images, fallbackAlt }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images.length) {
    return null;
  }

  const currentImage = images[activeIndex];

  return (
    <section className="travel-inline-stack">
      <div className="travel-inline-stack-stage" aria-live="polite">
        {images.map((image, index) => (
          <figure
            key={`${image.src}-${index}`}
            className={`travel-stack-card ${getStackCardState(
              index,
              activeIndex,
              images.length
            )}`}
          >
            <img
              className="travel-inline-image travel-stack-image"
              src={image.src}
              alt={image.caption || fallbackAlt}
            />
          </figure>
        ))}
      </div>

      <div className="travel-inline-stack-controls">
        <button
          className="travel-stack-button"
          type="button"
          onClick={() =>
            setActiveIndex((currentIndex) =>
              (currentIndex - 1 + images.length) % images.length
            )
          }
        >
          Prev
        </button>
        <div className="travel-inline-stack-dots" aria-label="Photo positions">
          {images.map((image, index) => (
            <button
              key={`${image.src}-dot`}
              className={`travel-stack-dot${index === activeIndex ? " is-active" : ""}`}
              type="button"
              aria-label={`Show photo ${index + 1}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
        <button
          className="travel-stack-button"
          type="button"
          onClick={() =>
            setActiveIndex((currentIndex) => (currentIndex + 1) % images.length)
          }
        >
          Next
        </button>
      </div>

      {currentImage.caption ? (
        <p className="travel-inline-caption">{currentImage.caption}</p>
      ) : (
        <p className="travel-stack-index">
          Photo {activeIndex + 1} of {images.length}
        </p>
      )}
    </section>
  );
}

function renderStoryBlocks(storyBlocks, post) {
  const renderedBlocks = [];

  for (let index = 0; index < storyBlocks.length; index += 1) {
    const block = storyBlocks[index];

    if (block.type === "heading") {
      renderedBlocks.push(
        <h3 key={`${block.content}-${index}`} className="travel-subheading">
          {block.content}
        </h3>
      );
      continue;
    }

    if (block.type === "note") {
      renderedBlocks.push(
        <p key={`${block.content}-${index}`} className="travel-note">
          {block.content}
        </p>
      );
      continue;
    }

    if (block.type === "image" && block.variant === "side-by-side") {
      const imageRow = [];
      let rowIndex = index;

      while (
        rowIndex < storyBlocks.length &&
        storyBlocks[rowIndex].type === "image" &&
        storyBlocks[rowIndex].variant === "side-by-side"
      ) {
        imageRow.push(storyBlocks[rowIndex]);
        rowIndex += 1;
      }

      renderedBlocks.push(
        <div
          key={`travel-inline-row-${index}`}
          className="travel-inline-row"
          style={{ gridTemplateColumns: `repeat(${imageRow.length}, minmax(0, 1fr))` }}
        >
          {imageRow.map((imageBlock, imageIndex) => (
            <figure
              key={`${imageBlock.src}-${imageIndex}`}
              className="travel-inline-media is-side-by-side"
            >
              <img
                className="travel-inline-image"
                src={imageBlock.src}
                alt={imageBlock.caption || post.title}
              />
              {imageBlock.caption ? (
                <figcaption className="travel-inline-caption">{imageBlock.caption}</figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      );

      index = rowIndex - 1;
      continue;
    }

    if (block.type === "image" && block.variant === "stack") {
      const imageStack = [];
      let stackIndex = index;

      while (
        stackIndex < storyBlocks.length &&
        storyBlocks[stackIndex].type === "image" &&
        storyBlocks[stackIndex].variant === "stack"
      ) {
        imageStack.push(storyBlocks[stackIndex]);
        stackIndex += 1;
      }

      renderedBlocks.push(
        <TravelInlineStack
          key={`travel-inline-stack-${index}`}
          images={imageStack}
          fallbackAlt={post.title}
        />
      );

      index = stackIndex - 1;
      continue;
    }

    if (block.type === "image") {
      renderedBlocks.push(
        <figure
          key={`${block.src}-${index}`}
          className={`travel-inline-media${block.variant ? ` is-${block.variant}` : ""}`}
        >
          <img
            className="travel-inline-image"
            src={block.src}
            alt={block.caption || post.title}
          />
          {block.caption ? (
            <figcaption className="travel-inline-caption">{block.caption}</figcaption>
          ) : null}
        </figure>
      );
      continue;
    }

    renderedBlocks.push(<p key={`${block.content}-${index}`}>{block.content}</p>);
  }

  return renderedBlocks;
}

function TravelDetailPage({ post }) {
  if (!post) {
    return (
      <main className="page-view">
        <section className="content-card">
          <a className="back-link" href="#/travel-blog">
            Back to Travel Blog
          </a>
          <h2>Story not found</h2>
          <p className="page-note">
            This travel story does not exist yet, or the slug changed.
          </p>
        </section>
      </main>
    );
  }

  const storyBlocks = parseTravelStoryBlocks(post.body);

  return (
    <main className="page-view">
      <article className="content-card travel-detail-card">
        <a className="back-link" href="#/travel-blog">
          Back to Travel Blog
        </a>
        <div className="section-heading">
          <p className="section-kicker">{post.city || "Travel Story"}</p>
          <h2>{post.title}</h2>
        </div>
        <div className="meta-row travel-detail-meta">
          <span>{post.dateLabel || "Travel Notes"}</span>
          <span>{post.city || "Unknown City"}</span>
        </div>
        <p className="travel-lead">{post.summary}</p>
        <div className="travel-story">
          {storyBlocks.length ? (
            renderStoryBlocks(storyBlocks, post)
          ) : (
            <p>No story has been written for this city yet.</p>
          )}
        </div>
        {post.gallery.length ? (
          <div className="travel-gallery-grid">
            {post.gallery.map((image) => (
              <figure key={image.url} className="travel-gallery-frame">
                <img
                  className="travel-gallery-image"
                  src={resolveTravelAssetUrl(image.url)}
                  alt={image.alt || post.title}
                />
              </figure>
            ))}
          </div>
        ) : null}
      </article>
    </main>
  );
}

export default TravelDetailPage;
