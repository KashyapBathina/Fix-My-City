import React from 'react';
import { Helmet } from 'react-helmet';

interface PageTitleProps {
    title?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title = "ContactHub" }) => {
    return (
        <Helmet>
            <title>{title}</title>
            {/* Add external CSS and JS here */}
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" 
                  rel="stylesheet" 
                  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" 
                  crossOrigin="anonymous" />
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" 
                    integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" 
                    crossOrigin="anonymous"></script>
        </Helmet>
    );
};

export default PageTitle;
