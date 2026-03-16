import { getTravelCoverImage } from "./travelMedia";

function TravelBlogPage({ travelPosts }) {
  return (
    <main className="page-view">
      <section className="content-card">
        <div className="section-heading">
          <p className="section-kicker">Stories</p>
          <h2>Travel Blog</h2>
        </div>
        {travelPosts.length ? (
          <div className="card-grid">
            {travelPosts.map((post) => {
              const coverImage = getTravelCoverImage(post);

              return (
                <a
                  key={post.id}
                  className="info-card travel-card travel-link"
                  href={`#/travel-blog/${post.slug}`}
                >
                  <div className="travel-image-frame">
                    {coverImage ? (
                      <img className="travel-image" src={coverImage} alt={post.title} />
                    ) : (
                      <div className="travel-image-placeholder">
                        <span>No travel photos uploaded yet</span>
                      </div>
                    )}
                  </div>
                  <div className="meta-row">
                    <span>{post.dateLabel || "Travel Notes"}</span>
                    <span>{post.city || "Unknown City"}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.summary}</p>
                  <span className="inline-link">Open story</span>
                </a>
              );
            })}
          </div>
        ) : (
          <p className="page-note">Travel stories will appear here once you publish them.</p>
        )}
      </section>
    </main>
  );
}

export default TravelBlogPage;
