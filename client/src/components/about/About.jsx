import React from 'react'
 

const About = () => {


  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">About us</h2>
          <p className="mb-4">
            Welcome to HopeHelps, where every ounce of hope and every helping hand contribute to meaningful change. At HopeHelps, we are dedicated to making a positive impact on lives through the generosity of individuals like you. With a commitment to transparency, we provide diverse causes, working directly with communities to address unique needs. Empowering donors with information and opportunities, we invite you to join us in creating a better world. Whether through a donation of funds or time, every contribution counts towards building a brighter future. Discover the joy of giving and be a part of the HopeHelps community, where small acts of kindness make a big difference. Thank you for supporting our mission!</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <img className="w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="office content 1" />
          <img className="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2" />
        </div>
      </div>
    </section>
  )
}
export default About

