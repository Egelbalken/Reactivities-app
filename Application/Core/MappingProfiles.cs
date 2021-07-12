using AutoMapper;
using Domain;

namespace Application.Core
{
    // Derive from a profile class.. via auto mapper.
    public class MappingProfiles : Profile
    {

        // Mapping from Activity to Activity
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
        }
    }
}