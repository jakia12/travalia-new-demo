const Gallery = () => {
  return (
    <section className="py-[90px]">
      <div className="container">
        <div className="cs_section_heading cs_style_1 text-center">
          <h3
            className="cs_section_title_up cs_ternary_font cs_accent_color cs_normal cs_fs_24"
            style={{ color: "#2ecc71", fontFamily: "Satisfy" }}
          >
            Gallery
          </h3>
          <h2
            className="cs_section_title cs_semibold cs_fs_56 mb-0 wow fadeInUp"
            data-wow-duration="0.8s"
            data-wow-delay="0.2s"
            style={{ fontFamily: "Playfair" }}
          >
            Envision Your Paradise
          </h2>
        </div>
        <div className="cs_height_55 cs_height_lg_40" />
      </div>
      <div className="container">
        <div className="grid-wrapper">
          <div className="tall">
            <img src="/img/gl1.webp" alt="" />
          </div>
          <div>
            <img src="/img/gl2.webp" alt="" />
          </div>
          <div className="tall">
            <img src="/img/gl3.webp" alt="" />
          </div>
          <div className="wide">
            <img src="/img/gl4.webp" alt="" />
          </div>
          <div>
            <img src="/img/gl5.webp" alt="" />
          </div>
          <div className="tall">
            <img src="/img/gl6.webp" alt="" />
          </div>
          <div className="big">
            <img src="/img/gl7.webp" alt="" />
          </div>
          <div>
            <img src="/img/gl8.webp" alt="" />
          </div>
          <div>
            <img src="/img/rs2.webp" alt="" />
          </div>
          <div>
            <img src="/img/ab1.webp" alt="" />
          </div>
          <div>
            <img src="/img/rs3.webp" alt="" />
          </div>
          <div className="wide">
            <img src="/img/rs1.webp" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
