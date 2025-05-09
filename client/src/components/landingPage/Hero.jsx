import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate()
const handleButton = () =>{
  // if(storedUserData){
    navigate('/donate-now')
  // }else{
    
    // navigate('/signup')
  // }
  
}

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="h-[90vh] grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-5xl dark:text-white">
            Donations Even If It Is A Small Can Bring Bigger{" "}
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Only when the society comes together and contributesIt was
            popularised in the t we will be able to make an impact.
          </p>
          <p
            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            Get started
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </p>
          <p
          onClick={handleButton}
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Donate Now
          </p>
        </div>
        <div className="lg:mt-0 border rounded-sm lg:col-span-5 lg:flex object-cover ">
          <img
            src="https://images.pexels.com/photos/6995223/pexels-photo-6995223.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="mockup"
            className="object-cover h-[50vh] lg:h-[80vh] md:h-[70vh] w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
