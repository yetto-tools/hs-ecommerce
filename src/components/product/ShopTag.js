import PropTypes from "prop-types";

import { setActiveSort } from "../../helpers/product";

const ShopTag = ({ tags, getSortParams }) => {
  
  
  return (
    <div className="sidebar-widget mt-50">
      <h4 className="pro-sidebar-title">Etiquetas</h4>
      <div className="sidebar-widget-tag mt-25">
        {tags ? (
          <ul>
            {tags.map((tag, key) => {
              return (
                <li key={key}>
                  <button
                    onClick={e => {
                      getSortParams("tag", tag);
                      setActiveSort(e);
                    }}
                  >
                    {tag}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          "Sin etiquetas"
        )}
      </div>
    </div>
  );
};

ShopTag.propTypes = {
  getSortParams: PropTypes.func,
  tags: PropTypes.array
};

export default ShopTag;
