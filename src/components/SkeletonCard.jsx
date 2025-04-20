const SkeletonCard = () => (
    <div className="bg-white flex flex-col  px-3 shadow-green-300/50 shadow-lg rounded-lg p-4 w-64 animate-pulse">
      <div className="bg-gray-200 h-[300px] rounded"></div>
      <div className="flex mt-4 justify-between items-center">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-28 bg-gray-200 rounded"></div>
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
        </div>
        <div className="bg-gray-200 h-10 w-10 rounded-full"></div>
      </div>
    </div>
  );
  
  export default SkeletonCard