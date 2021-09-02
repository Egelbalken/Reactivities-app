using System.Linq;
using Application.Activities;
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
            CreateMap<Activity, ActivityDto>()
            .ForMember(displayName => displayName.HostUserName, option => option
                .MapFrom(source => source.Attendees
                    .FirstOrDefault(host => host.IsHost).AppUser.UserName));
            CreateMap<ActivityAttendee, Profiles.Profile>()
            .ForMember(displayName => displayName.DisplayName, o => o.MapFrom(source => source.AppUser.DisplayName))
            .ForMember(userName => userName.Username, o => o.MapFrom(source => source.AppUser.UserName))
            .ForMember(bio => bio.Bio, o => o.MapFrom(source => source.AppUser.Bio));

        }
    }
}