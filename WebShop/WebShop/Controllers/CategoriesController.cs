using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebShop.Data;
using WebShop.Data.Entities;
using WebShop.Models;

namespace WebShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly AppEFContext _appEFContext;
        public CategoriesController(AppEFContext appEFContext)
        {
            _appEFContext = appEFContext;
        }

        [HttpGet("list")]
        public async Task<IActionResult> List()
        {
            var result = await _appEFContext.Categories
                .Select(x => new CategoryItemViewModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                    Image = x.Image,
                    ParentId = x.ParentId
                })
                .ToListAsync();
            return Ok(result);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CategoryCreateViewModel model)
        {
            CategoryEntity category = new CategoryEntity
            {
                DateCreated = DateTime.UtcNow,
                Name = model.Name,
                Description = model.Description,
                Image = model.Image,
                Priority = model.Priority,
                ParentId = model.ParentId==0?null:model.ParentId,
            };
            await _appEFContext.AddAsync(category);
            await _appEFContext.SaveChangesAsync();
            return Ok(category);
        }

    }
}



