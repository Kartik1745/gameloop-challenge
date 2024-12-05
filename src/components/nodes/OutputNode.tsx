import { memo, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { Briefcase, MapPin, Building2, DollarSign, Clock, Calendar, ExternalLink } from 'lucide-react';
import { Job } from '../../types/job';

interface OutputNodeProps {
  data: {
    jobs: Job[];
    loading?: boolean;
  };
}

const OutputNode = memo(({ data }: OutputNodeProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [data.jobs]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-auto min-w-[300px] max-w-[600px] transition-all duration-200 ease-in-out">
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-3 h-3 !bg-blue-500" 
      />
      <div className="sticky top-0 bg-white z-10 pb-2 border-b border-gray-100 mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Found Jobs ({data.jobs.length})
        </h3>
      </div>
      <div 
        ref={scrollContainerRef}
        className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2"
      >
        {data.loading ? (
          <div className="text-center text-gray-500 py-8">
            <div className="animate-spin mx-auto mb-3 w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            <p>Searching for jobs...</p>
          </div>
        ) : data.jobs.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <Briefcase className="mx-auto mb-3 text-gray-400" size={24} />
            <p>No jobs found. Try a different search term.</p>
          </div>
        ) : (
          data.jobs.map((job) => (
            <div
              key={job.id}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-all duration-200 hover:shadow-md bg-white"
            >
              <div className="flex items-start gap-3">
                {job.image && (
                  <img 
                    src={job.image} 
                    alt={`${job.company} logo`}
                    className="w-12 h-12 object-contain rounded"
                  />
                )}
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">{job.title}</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Building2 size={16} className="text-blue-500 flex-shrink-0" />
                      <span className="truncate">{job.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-blue-500 flex-shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-blue-500 flex-shrink-0" />
                      <span className="truncate">{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-blue-500 flex-shrink-0" />
                      <span className="truncate">{job.type}</span>
                    </div>
                    {job.datePosted && (
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-blue-500 flex-shrink-0" />
                        <span className="truncate">{job.datePosted}</span>
                      </div>
                    )}
                  </div>
                  {job.url && (
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-3 text-sm text-blue-500 hover:text-blue-600"
                    >
                      <ExternalLink size={16} />
                      Apply Now
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
});

OutputNode.displayName = 'OutputNode';
export default OutputNode;