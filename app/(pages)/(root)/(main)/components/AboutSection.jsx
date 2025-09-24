// app/_components/AboutSection.jsx
"use client";

export default function AboutSection() {
  const features = [
    "All places and activities carefully curated",
    "98% Course Completion Rates",
    "We are an award-winning agency",
    "Trusted by over 80,000 happy travelers",
  ];

  return (
    <section className="cs_about cs_style_1">
      <div className="cs_height_140 cs_height_lg_80" />
      <div className="container">


        
        <div className="row align-items-center cs_gap_y_40">
          {/* Left Image */}
          <div className="col-lg-5">
            <img src="/assets/images/about_img.png" alt="About Us" />
          </div>

          {/* Right Content */}
          <div className="col-lg-6 offset-lg-1">
            <div className="cs_section_heading cs_style_1">
              <h3 className="cs_section_title_up cs_ternary_font cs_accent_color cs_normal cs_fs_24">
                About Us
              </h3>
              <h2
                className="cs_section_title cs_semibold cs_fs_56 mb-0 wow fadeInRight"
                data-wow-duration="0.8s"
                data-wow-delay="0.2s"
              >
                We are Professional Planners For your
              </h2>
            </div>

            <div className="cs_about_text">
              <p>
                Planning a trip can be stressful, but we make it effortless.
                From handpicked destinations to smooth bookings, our experts
                handle every detail so you can simply relax and enjoy. With us,
                your journey is designed for comfort, excitement, and
                unforgettable memories.
              </p>
              <p className="mb-0 cs_accent_color cs_medium cs_fs_18">
                Speak to our Destination Experts at Direct Call +1 546 378 654
              </p>
            </div>

            {/* Features List */}
            <ul className="cs_list cs_style_1 cs_mp0 cs_fs_18">
              {features.map((f, i) => (
                <li key={i}>
                  <i className="fa-solid fa-circle-check cs_accent_color"></i>
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <a href="/about" className="cs_btn cs_style_1 cs_fs_18 cs_medium">
              Read More
              <svg
                width="20"
                height="10"
                viewBox="0 0 20 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.5866 5.69629H0.41235C0.184269 5.69629 0 5.46776 0 5.1849C0 4.90204 0.184269 4.67352 0.41235 4.67352H18.5906L16.0881 1.57004C15.927 1.37028 15.927 1.04587 16.0881 0.846109C16.2492 0.646349 16.5108 0.646349 16.6718 0.846109L19.8792 4.82374C19.9977 4.97076 20.0325 5.1897 19.9681 5.38147C19.9036 5.57164 19.7529 5.69629 19.5866 5.69629Z"
                  fill="currentColor"
                />
                <path
                  d="M16.3435 9.11986C16.2384 9.11986 16.1333 9.08012 16.0538 8.99935C15.8935 8.83909 15.8935 8.57884 16.0538 8.41858L19.2487 5.22371C19.4089 5.06345 19.6692 5.06345 19.8294 5.22371C19.9897 5.38396 19.9897 5.64422 19.8294 5.80448L16.6346 8.99935C16.5538 9.08012 16.4487 9.11986 16.3435 9.11986Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="cs_height_140 cs_height_lg_80" />
    </section>
  );
}
