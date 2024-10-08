
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        // 1. 定义请求类，用于表示通过ID获取某个活动的请求
        public class Query : IRequest<Activity>
        {
            public Guid Id { get; set; }  // 定义请求的参数：活动的ID
        }

        // 2. 定义处理器，用于处理Query请求，并从数据库中查找活动
        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;  // 通过依赖注入获取DataContext（数据库上下文）
            }

            // 3. 实现Handle方法来处理请求
            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                // 使用Entity Framework Core根据ID查找活动
                return await _context.Activities.FindAsync(request.Id);
            }
    }
}
}