import PropTypes from 'prop-types';

const Heading = ({title}) => {
  return (
    <div className="font-semibold text-lg leading-relaxed text-gray-800">{title}</div>
  )
}

Heading.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Heading