using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    /// <summary>
    /// Comment List
    /// </summary>
    public class List
    {
        public class Query : IRequest<Result<List<CommentDto>>>
        {
            public Guid ActivityId { get; set; }

            /// <summary>
            /// Class for a Query of a interface handler.
            /// </summary>
            public class Handler : IRequestHandler<Query, Result<List<CommentDto>>>
            {
                private readonly DataContext _dataContext;
                private readonly IMapper _mapper;
                public Handler(DataContext dataContext, IMapper mapper)
                {
                    _mapper = mapper;
                    _dataContext = dataContext;
                }

                /// <summary>
                /// Giving us a list of a comment of a type of DTOs.
                /// </summary>
                /// <param name="request">Query</param>
                /// <param name="cancellationToken">Cancel</param>
                /// <returns></returns>
                public async Task<Result<List<CommentDto>>> Handle(Query request, CancellationToken cancellationToken)
                {
                    var comments = await _dataContext.Comments
                        .Where(x => x.Activity.Id == request.ActivityId)
                        .OrderByDescending(x => x.CreatedAt)
                        .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
                        .ToListAsync();

                    return Result<List<CommentDto>>.Success(comments);
                }
            }
        }
    }
}