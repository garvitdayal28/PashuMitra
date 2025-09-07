import PropTypes from "prop-types";

/**
 * A component to display breed prediction results
 */
const BreedPredictionResults = ({ prediction, breedData }) => {
  if (!prediction) return null;

  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Breed Match Percentage */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Breed Match Percentage</h2>
        <div className="h-64">
          {breedData.map((breed) => (
            <div key={breed.name} className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span>{breed.name}</span>
                <span>{breed.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${
                    breed.name === prediction.breed
                      ? "bg-blue-500"
                      : "bg-blue-300"
                  }`}
                  style={{ width: `${breed.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Most Probable Answer */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Most Probable Answer</h2>
        <div className="p-4">
          <h3 className="text-3xl font-bold">{prediction.breed}</h3>
          <p className="text-gray-600 italic mb-6">
            {prediction.scientificName}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-100 p-3 rounded">
              <h4 className="text-center font-medium">
                {prediction.relatedBreed}
              </h4>
              <p className="text-center text-xs text-gray-500">Related Breed</p>
            </div>
            <div className="bg-gray-100 p-3 rounded">
              <h4 className="text-center font-medium">{prediction.status}</h4>
              <p className="text-center text-xs text-gray-500">Status</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BreedPredictionResults.propTypes = {
  prediction: PropTypes.shape({
    breed: PropTypes.string.isRequired,
    confidence: PropTypes.number.isRequired,
    scientificName: PropTypes.string.isRequired,
    relatedBreed: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }),
  breedData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      percentage: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default BreedPredictionResults;
