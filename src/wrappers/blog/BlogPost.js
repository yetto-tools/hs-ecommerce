import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const BlogPost = () => {
  return (
    <Fragment>
      <div className="blog-details-top">
        <div className="blog-details-img">
          <img
            alt=""
            src={
              process.env.PUBLIC_URL +
              "/assets/img/blog/INTERIOR-DEL-POSTEO-1400x450.webp"
            }
          />
        </div>
        <div className="blog-details-content">
          <div className="blog-meta-2">
            <ul>
              <li>
                {new Intl.DateTimeFormat("es-GT", {
                  dateStyle: "full",
                  timeStyle: "short",
                  timeZone: "America/Guatemala",
                }).format(new Date())}
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                  4 <i className="fa fa-comments-o" />
                </Link>
              </li>
            </ul>
          </div>
          <h3>Gorras de Tortugas Ninja by New Era, fusión de dos pasiones</h3>
          <p>
            Es sabido que el baloncesto es un deporte que ha capturado el
            corazón de más de 2 millones de seguidores en todo el mundo.
            Sorprendentemente, más de la mitad provienen de fuera de EE. UU., lo
            que demuestra su impacto global. Ni qué decir de las Tortugas Ninja,
            que han dejado huella desde su creación en la década de 1980. Sin
            duda, son unos adolescentes mutantes abrazados con cariño por
            personas de distintas edades y generaciones, convirtiéndose en un
            clásico atemporal. Así, esta colaboración entre New Era, los equipos
            de baloncesto y las Tortugas Ninja permite a los aficionados
            expresar su pasión por ambos mundos en una sola prenda, que además
            es combinable con una interminable opción de outfits gracias a sus
            diseños y colores.{" "}
          </p>
          <blockquote>
            Las Tortugas Ninja y el baloncesto, dos elementos representativos de
            la cultura pop, se unen en una emocionante colaboración con New Era.
            Bajo el nombre NBA X TMNT: MUTANT MAYHEM, esta nueva colección de
            gorras de New Era rinde homenaje a las Tortugas Ninja, la cual
            permite a los fanáticos mostrar su pasión tanto por el deporte como
            por estos héroes adolescentes mutantes.
          </blockquote>
          <p>
            La colección cuenta con detalles exclusivos que las hacen únicas y
            atractivas Leonardo, Donatello, Michelangelo y Raphael, los cuatro
            hermanos mutantes, están presentes en esta colección con su nombre
            grabado en la parte frontal de la gorra. La colección muestra el
            logo de los equipos de baloncesto Bulls, Knicks, Warriors, Nets y
            Lakers. El diseño detallado de cada una de las Tortugas Ninja está
            tejido con precisión en la parte delantera de la gorra, agregando un
            toque distintivo y llamativo. Sin duda se ve reflejada desde la
            seriedad y liderazgo de Leonardo hasta el humor y la creatividad de
            Michelangelo. Para agregar un toque de estilo urbano, cuentan con
            detalles bordados en los laterales y en la parte posterior. Como
            graffitis con el nombre de las Tortugas Ninja y otros símbolos
            relacionados que agregan un elemento único. Como garantía de
            autenticidad y calidad, el logotipo de New Era se encuentra en el
            costado izquierdo de cada gorra.
          </p>
        </div>
      </div>
      <div className="dec-img-wrapper">
        <div className="row">
          <div className="col-md-6">
            <div className="dec-img mb-50">
              <img
                alt=""
                src={
                  process.env.PUBLIC_URL +
                  "/assets/img/blog/NEC23_TMNT_1200x1200_1_480x480.webp"
                }
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="dec-img mb-50">
              <img
                alt=""
                src={
                  process.env.PUBLIC_URL +
                  "/assets/img/blog/NEC23_TMNT_1200x1200_5_480x480.webp"
                }
              />
            </div>
          </div>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehendrit
          in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </div>
      <div className="tag-share">
        <div className="dec-tag">
          <ul>
            <li>
              <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                lifestyle ,
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                interior ,
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                outdoor
              </Link>
            </li>
          </ul>
        </div>
        <div className="blog-share">
          <span>Compartir :</span>
          <div className="share-social">
            <ul>
              <li>
                <a
                  className="facebook"
                  href="https://www.facebook.com/Hypestreetstoree?locale=es_LA"
                >
                  <i className="fa fa-facebook" />
                </a>
              </li>
              <li>
                <a className="twitter" href="//twitter.com">
                  <i className="fa fa-twitter" />
                </a>
              </li>
              <li>
                <a
                  className="instagram"
                  href="https://www.instagram.com/hypestreetstore/"
                >
                  <i className="fa fa-instagram" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="next-previous-post">
        <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
          {" "}
          <i className="fa fa-angle-left" /> anterior post
        </Link>
        <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
          siguiente post <i className="fa fa-angle-right" />
        </Link>
      </div>
    </Fragment>
  );
};

export default BlogPost;
