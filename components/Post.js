import BlurImage from "@/components/BlurImage";
import React, { useEffect, useState } from "react";
import { formatDate } from "@/utils/formatDate";
import { Calender, Clock } from "@/utils/Icons";
import { readingTime } from "@/utils/readingTime";
import { slugify } from "@/utils/slugify";
import { truncateString } from "@/utils/truncateString";
import Link from "next/link";


// "submenu": [
//   {
//     "name": "All Scholarships",
//     "link": "/scholarships"
//   },
//   {
//     "name": "Abroad",
//     "link": "/author"
//   },
//   {
//     "name": "for Bachelors",
//     "link": "/author/ann-monika"
//   },
//   {
//     "name": "For Masters",
//     "link": "/blog/elements"
//   },
//   {
//     "name": "High/Secondary School",
//     "link": "/tags"
//   },
//   {
//     "name": "For SC/ST",
//     "link": "/categories"
//   },
//   {
//     "name": "For Medicine",
//     "link": "/tags/lifestyle"
//   },
//   {
//     "name": "For PhD",
//     "link": "/categories/tech"
//   },
//   {
//     "name": "For Short courses",
//     "link": "/privacy"
//   },
//   {
//     "name": "Other",
//     "link": "/terms-of-service"
//   }
// ]


const Post = ({
  post: {
    slug,
    content,
    category_id,
    title,
    featured_image,
    createdAt,
    excerpt,
    short_desc,
  },
  compact,
  status,
}) => {
  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState("");

  // Function to generate a random background color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Function to calculate text color based on background brightness
  const getContrastColor = (bgColor) => {
    // Convert hex color to RGB
    const r = parseInt(bgColor.slice(1, 3), 16);
    const g = parseInt(bgColor.slice(3, 5), 16);
    const b = parseInt(bgColor.slice(5, 7), 16);

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return black for light backgrounds, white for dark backgrounds
    return luminance > 0.5 ? "#000000" : "#FFFFFF";
  };

  // Set random background and text colors when the component mounts
  useEffect(() => {
    const randomBgColor = getRandomColor();
    setBgColor(randomBgColor);
    setTextColor(getContrastColor(randomBgColor));
  }, []);
  return (
    <article className="bg-white d-flex flex-column h-100">
      {!compact && (
        <div className="post-image" style={{ backgroundColor: bgColor }}>
          <Link href={`/${category_id?.slug}/${slug}`} className="d-block" title={title}>
            {featured_image ? (
              <BlurImage
                className="w-100 h-auto"
                src={featured_image}
                alt={title}
                width="368"
                height="238"
              />
            ) : (
              <div
                style={{
                  color: textColor,
                }}
                className="title"
              >
                {title}
              </div>
            )}
          </Link>

        </div>
      )}
      <div
        className={`p-4 ${status ? "position-relative" : ""
          }`}
      >
        {status && <p className="post-badge mb-0">{status}</p>}
        <ul className={`post-meta list-inline mb-3 ${status ? "mt-3" : ""}`}>
          <li className="list-inline-item">
            <Calender className="me-1 align-bottom" />
            {formatDate(createdAt)}
          </li>
          <li className="list-inline-item">•</li>
          <li className="list-inline-item">
            <Clock className="me-1 align-bottom" />
            {readingTime(content)} min read
          </li>
        </ul>
        <div className="position-relative">
          <h3 className="h4 post-title mb-2 line-clamp clamp-2">
            <Link
              href={`/${category_id?.slug}/${slug}`}
              className="text-link stretched-link"
              title={title}
            >
              {title}
            </Link>
          </h3>
          <p className={`mb-0 line-clamp ${compact ? "clamp-2" : "clamp-3"}`}>
            {truncateString(short_desc, 150)}
          </p>
        </div>
      </div>
    </article>
  );
};
export default Post;
