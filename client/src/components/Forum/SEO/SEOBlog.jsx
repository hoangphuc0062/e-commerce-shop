
import React from 'react'
import { Helmet } from "react-helmet-async";
import he from "he";

const SEOBlog = ({ data }) => {
  return (
    <div>
      <Helmet>
        <title>{data.postTitle}</title>
        <meta name="description" content={he.decode(data.shortDescription)} />
        <meta name="keywords" content={data.seoKeyWords} />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content={data.postTitle} />
        <meta
          property="og:description"
          content={he.decode(data.shortDescription)}
        />
        <meta property="og:image" content={data.thumbnail} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="localhost:5173" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.postTitle} />
        <meta
          name="twitter:description"
          content={he.decode(data.shortDescription)}
        />
        <meta name="twitter:image" content={data.thumbnail} />
         
        {/* LinkedIn */}
        <meta property="og:title" content={data.postTitle} />
        <meta
          property="og:description"
          content={he.decode(data.shortDescription)}
        />
        <meta property="og:image" content={data.thumbnail} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="localhost:5173" />
      </Helmet> 
    </div>
  );
}

export default SEOBlog
