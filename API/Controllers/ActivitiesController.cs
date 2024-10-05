using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly DataContext _Context ;
        public ActivitiesController(DataContext context)
        {
            _Context = context;
            
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities(){
            return await _Context.Activities.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id){
            return await _Context.Activities.FindAsync(id);
        }
    }
}