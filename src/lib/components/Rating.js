import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./../styles/rating.css";

export const Rating = ({ max, ratingItem }) => {
  const [starsCssValues, setStarsCssValues] = useState([]);

  useEffect(() => {
    setStarsCssValues(Array(max).fill(""));
  }, [max, ratingItem]);
  return (
    <div className="ratingSection">
      <span>
        {starsCssValues.map((__, index) => (
          <i
            key={index}
            className={"fas fa-star ".concat(
              ratingItem.value >= index + 1 ? "checked" : ""
            )}
          ></i>
        ))}
      </span>
      &nbsp;
      {ratingItem.value} ({ratingItem.count})
    </div>
  );
};

Rating.propTypes = {
  max: PropTypes.number.isRequired,
  ratingItem: PropTypes.object.isRequired,
};