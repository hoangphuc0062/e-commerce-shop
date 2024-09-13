import PropTypes from 'prop-types';

function HeadingSection({ title }) {
  return (
    <div className="mt-4 mb-2">
      <h2 className="text-2xl font-bold mb-2 text-black">{title.toUpperCase()}</h2>
      <hr className="border-2 border-red-600 w-[120px]" />
    </div>
  );
}

HeadingSection.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeadingSection;