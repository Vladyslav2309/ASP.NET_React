using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Drawing;
using WebShop.Data;
using WebShop.Data.Entities;
using WebShop.Helpers;
using WebShop.Models;

namespace WebShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppEFContext _appContext;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        public ProductsController(AppEFContext appEFContext, IConfiguration configuration, IMapper mapper)
        {
            _appContext = appEFContext;
            _configuration = configuration;
            _mapper = mapper;

        }

        [HttpPost]
        public async Task<IActionResult> UploadImage([FromForm] ProductUploadImageViewModel model)
        {

            string imageName = string.Empty;
            if (model.Image != null)
            {
                var fileExp = Path.GetExtension(model.Image.FileName);
                var dirSave = Path.Combine(Directory.GetCurrentDirectory(), "images");
                imageName = Path.GetRandomFileName() + fileExp;
                using (var ms = new MemoryStream())
                {
                    await model.Image.CopyToAsync(ms);
                    var bmp = new Bitmap(Image.FromStream(ms));
                    string[] sizes = ((string)_configuration.GetValue<string>("ImageSizes")).Split(" ");
                    foreach (var s in sizes)
                    {
                        int size = Convert.ToInt32(s);
                        var saveImage = ImageWorker.CompressImage(bmp, size, size, false);
                        saveImage.Save(Path.Combine(dirSave, s + "_" + imageName));
                    }
                }
                var entity = new ProductImageEntity();
                entity.Name = imageName;
                entity.DateCreated = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc);
                _appContext.ProductImages.Add(entity);
                _appContext.SaveChanges();
                return Ok(_mapper.Map<ProductImageItemViewModel>(entity));

            }
            return BadRequest();
        }

    }
}
