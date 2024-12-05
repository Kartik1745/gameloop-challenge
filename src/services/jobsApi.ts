import axios from 'axios';

export const searchJobs = async (query: string) => {
  try {
    const response = await axios.get('https://jobs-api14.p.rapidapi.com/v2/list', {
      params: {
        query,
        location: 'United States',
        autoTranslateLocation: 'false',
        remoteOnly: 'false',
        employmentTypes: 'fulltime;parttime;intern;contractor'
      },
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_TZ_API_KEY,
        'x-rapidapi-host': import.meta.env.VITE_TZ_API_HOST
      }
    });

    return response.data.jobs.map((job: any) => ({
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      salary: job.salaryRange || 'Not specified',
      type: job.employmentType,
      datePosted: job.datePosted,
      image: job.image,
      url: job.jobProviders?.[0]?.url
    }));
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};