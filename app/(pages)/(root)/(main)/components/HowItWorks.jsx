// app/_components/HowItWorks.jsx
"use client";

export default function HowItWorks() {
  const steps = [
    {
      img: "/images/working_process_1.png",
      number: "01",
      title: "Get Travel Insurence",
      text: "Stay protected on every journey with reliable travel insurance tailored to your needs.",
    },
    {
      img: "/images/working_process_2.png",
      number: "02",
      title: "Compare & Book",
      text: "Easily compare options and book the best flights, tours, and packages in minutes",
    },
    {
      img: "/images/working_process_3.png",
      number: "03",
      title: "Book a Room",
      text: "Find the perfect stay, from budget-friendly rooms to luxury resorts, at the best rates",
    },
  ];

  return (
    <section>
      <div className="cs_height_135 cs_height_lg_80" />
      <div className="container">
        {/* Section Heading */}
        <div className="cs_section_heading cs_style_1 text-center">
          <h3
            className="cs_section_title_up cs_ternary_font cs_accent_color cs_normal cs_fs_24"
            style={{ color: "#2ecc71", fontFamily: "Satisfy" }}
          >
            HOW IT WORKS
          </h3>
          <h2
            className="cs_section_title cs_semibold cs_fs_56 mb-0 wow fadeInUp"
            data-wow-duration="0.8s"
            data-wow-delay="0.2s"
            style={{ fontFamily: "Playfair" }}
          >
            Getting Started? It’s Simple
          </h2>
        </div>

        <div className="cs_height_55 cs_height_lg_40" />

        {/* Steps */}
        <div className="cs_steps cs_style_1">
          {steps.map((step, i) => (
            <div className="cs_step text-center position-relative" key={i}>
              <div className="cs_step_thumb rounded-circle position-relative thumb">
                <img
                  src={step.img}
                  alt={step.title}
                  className="rounded-circle"
                />
                <span className="cs_step_number cs_semibold text-white cs_fs_25 rounded-circle cs_accent_bg d-flex align-items-center justify-content-center position-absolute">
                  {step.number}
                </span>
              </div>
              <h2
                className="cs_fs_25 cs_semibold"
                style={{ fontFamily: "Playfair" }}
              >
                {step.title}
              </h2>
              <p className="m-0">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="cs_height_133 cs_height_lg_80" />
    </section>
  );
}
