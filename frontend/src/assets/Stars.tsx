import React from "react";
import "../variables.scss";

interface ReviewsProps {
  rating: number;
  numberOfReviews: number;
}

const Reviews: React.FC<ReviewsProps> = ({ rating, numberOfReviews }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  let starIndex = 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <svg
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        key={starIndex++}
      >
        <path
          d="M9.35672 3.50544L12.1663 3.89812C12.963 4.00942 13.2822 4.95848 12.7066 5.50395L10.6762 7.42769C10.4475 7.64435 10.3435 7.95617 10.3978 8.26161L10.881 10.9742C11.018 11.7435 10.1861 12.3311 9.4731 11.9688L6.95907 10.6907C6.67594 10.5469 6.33791 10.5472 6.05521 10.6917L3.54426 11.9757C2.83226 12.3398 1.99878 11.7539 2.13385 10.9844L2.61031 8.27068C2.6639 7.96509 2.55921 7.65341 2.32995 7.43732L0.295169 5.51825C-0.281901 4.97405 0.0349616 4.02429 0.8315 3.91115L3.64004 3.5121C3.95632 3.46721 4.22953 3.2742 4.37058 2.99608L5.62387 0.52602C5.97928 -0.174371 7.00858 -0.175646 7.36559 0.524037L8.62487 2.99112C8.76665 3.26882 9.04029 3.46126 9.35672 3.50544Z"
          fill="#124D00"
        />
      </svg>,
    );
  }

  if (hasHalfStar) {
    stars.push(
      <svg
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        key={starIndex++}
      >
        <path
          d="M3.31979 12.0865C3.0428 12.0865 2.76785 12.0027 2.5325 11.8378C2.11525 11.5454 1.9097 11.0584 1.99619 10.5672L2.4406 8.04367C2.46646 7.89702 2.41606 7.74755 2.30576 7.64399L0.408002 5.85923C0.0385306 5.51183 -0.0923692 5.00153 0.0662885 4.5274C0.224946 4.05327 0.64029 3.71392 1.15001 3.64159L3.76918 3.27045C3.92141 3.24897 4.05289 3.15629 4.12083 3.02279L5.28957 0.725887C5.51719 0.278742 5.97855 0.000706391 6.49397 0C6.49441 0 6.49499 0 6.49558 0C7.01026 0 7.47177 0.276905 7.69997 0.723203L8.87427 3.01728C8.94264 3.15064 9.07428 3.2429 9.2265 3.26423L11.8465 3.62929C12.3567 3.70036 12.7729 4.03886 12.9328 4.51256C13.0926 4.98627 12.9627 5.49699 12.5943 5.84524L10.7009 7.63425C10.5909 7.73823 10.5408 7.88798 10.5669 8.03463L11.0176 10.557C11.1054 11.0482 10.901 11.5355 10.4845 11.8289C10.068 12.1221 9.52585 12.1609 9.06931 11.9294L6.7248 10.7408C6.58849 10.6716 6.42604 10.6722 6.28988 10.7414L3.94814 11.9352C3.74902 12.0365 3.53397 12.0865 3.31979 12.0865ZM6.49543 0.84781H6.49485C6.49485 0.84781 6.49349 10.3552 6.49349 10.1592L5.88067 9.99161C6.27191 9.79185 6.73926 9.79128 7.13138 9.98992L9.47589 11.1785C9.63717 11.2603 9.82096 11.2472 9.96808 11.1436C10.1152 11.04 10.1844 10.8747 10.1536 10.7013L9.70292 8.17887C9.62768 7.75716 9.77173 7.32697 10.088 7.02802L11.9814 5.23888C12.1116 5.11596 12.1555 4.94276 12.0993 4.77548C12.0428 4.60821 11.9015 4.49335 11.7215 4.4682L9.10145 4.10314C8.66361 4.04211 8.28493 3.77679 8.08858 3.39336L6.91428 1.09914C6.83364 0.94176 6.67717 0.84781 6.49543 0.84781Z"
          fill="#124D00"
        />
      </svg>,
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <svg
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        key={starIndex++}
      >
        <path
          d="M3.31979 12.0865C3.0428 12.0865 2.76785 12.0027 2.5325 11.8378C2.11525 11.5454 1.9097 11.0584 1.99619 10.5672L2.4406 8.04367C2.46646 7.89702 2.41606 7.74755 2.30576 7.644L0.408001 5.85923C0.0385307 5.51183 -0.0923692 5.00153 0.0662885 4.5274C0.224946 4.05327 0.64029 3.71392 1.15001 3.64159L3.76918 3.27045C3.92141 3.24897 4.05289 3.1563 4.12083 3.02279L5.28957 0.725887C5.51719 0.278742 5.97855 0.000706391 6.49397 0C6.49441 0 6.49499 0 6.49558 0C7.01026 0 7.47177 0.276905 7.69997 0.723203L8.87427 3.01728C8.94265 3.15064 9.07428 3.2429 9.22651 3.26423L11.8465 3.62929C12.3567 3.70036 12.7729 4.03886 12.9328 4.51257C13.0926 4.98627 12.9627 5.49699 12.5943 5.84524L10.7009 7.63425C10.5909 7.73823 10.5408 7.88798 10.5669 8.03463L11.0176 10.557C11.1054 11.0482 10.901 11.5355 10.4845 11.8289C10.068 12.1221 9.52585 12.1609 9.06931 11.9294L6.7248 10.7408C6.58849 10.6716 6.42604 10.6722 6.28988 10.7414L3.94814 11.9352C3.74902 12.0365 3.53397 12.0865 3.31979 12.0865ZM6.49543 0.84781H6.49485C6.31296 0.847951 6.15635 0.942325 6.076 1.10027L4.90725 3.39717C4.71192 3.78103 4.33383 4.04734 3.89613 4.10922L1.27697 4.48035C1.09698 4.50593 0.956145 4.62107 0.900045 4.78848C0.844091 4.9559 0.888503 5.12896 1.01882 5.25159L2.91658 7.03636C3.23389 7.33446 3.37896 7.76436 3.3046 8.18622L2.86018 10.7097C2.82965 10.8832 2.89934 11.0482 3.04674 11.1516C3.19386 11.2546 3.37809 11.2674 3.53893 11.1854L5.88067 9.99161C6.27191 9.79185 6.73926 9.79128 7.13138 9.98992L9.47589 11.1785C9.63717 11.2603 9.82096 11.2472 9.96808 11.1436C10.1152 11.04 10.1844 10.8747 10.1536 10.7013L9.70292 8.17887C9.62768 7.75716 9.77173 7.32697 10.088 7.02802L11.9814 5.23888C12.1116 5.11596 12.1555 4.94276 12.0993 4.77548C12.0428 4.60821 11.9015 4.49335 11.7215 4.4682L9.10145 4.10314C8.66361 4.04211 8.28493 3.77679 8.08858 3.39336L6.91428 1.09914C6.83364 0.94176 6.67717 0.84781 6.49543 0.84781Z"
          fill="#124D00"
        />
      </svg>,
    );
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">{stars}</div>
      <p className="reviews" style={{ color: "var(--secondary-color)" }}>
        ({numberOfReviews})
      </p>
    </div>
  );
};

export default Reviews;
