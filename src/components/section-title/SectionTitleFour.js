import PropTypes from "prop-types";
import clsx from "clsx";

const SectionTitleFour = ({ titleText, spaceBottomClass }) => {
  return (
    <div className={clsx("section-title-3 ", spaceBottomClass)}>
      <div className="row col-12 mx-auto mb-4 mt-40 text-center">
        <h2 className="text-6xl font-medium  uppercase stretch-pro">
          {titleText}
        </h2>
      </div>
    </div>
  );
};

SectionTitleFour.propTypes = {
  spaceBottomClass: PropTypes.string,
  titleText: PropTypes.string,
};

export default SectionTitleFour;
