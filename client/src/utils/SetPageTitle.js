import { Helmet } from 'react-helmet';

const SetPageTitle = ({ title }) => {
    return (
        <Helmet>
            <title>{`${title}`} | {process.env.REACT_APP_TITLE}</title>
        </Helmet>
    );
}

export default SetPageTitle;