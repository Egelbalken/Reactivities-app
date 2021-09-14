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
                .ForMember(displayName => displayName.HostUsername, option => option
                    .MapFrom(source => source.Attendees
                        .FirstOrDefault(host => host.IsHost).AppUser.UserName));
            CreateMap<ActivityAttendee, AttendeeDto>()
                .ForMember(displayName => displayName.DisplayName, o => o
                    .MapFrom(source => source.AppUser.DisplayName))
                        .ForMember(userName => userName.Username, o => o
                            .MapFrom(source => source.AppUser.UserName))
                                .ForMember(bio => bio.Bio, o => o
                                    .MapFrom(source => source.AppUser.Bio))
                                        .ForMember(d => d.Image, o => o
                                            .MapFrom(s => s.AppUser.Photos
                                                .FirstOrDefault(x => x.IsMain).Url));

            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.Image, o => o
                    .MapFrom(s => s.Photos
                        .FirstOrDefault(x => x.IsMain).Url));
        }
    }
}