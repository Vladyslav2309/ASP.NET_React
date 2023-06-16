using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebShop.Abstract;
using WebShop.Data.Entities.Identity;

namespace WebShop.Services
{
    public class JwtTokenService : IJwttokenService
    {
        private readonly IConfiguration _config;
        private readonly UserManager<UserEntity> _userManager;
        public JwtTokenService(IConfiguration configuration, UserManager<UserEntity> userManager)
        {
            _config = configuration;
            _userManager = userManager;
        }
        public async Task<string> CreateToken(UserEntity user)
        {
            var roles = await _userManager.GetRolesAsync(user);
            List<Claim> claims = new List<Claim>()
            {
                new Claim("email", user.Email),
                new Claim("image", user.Image ?? string.Empty),
            };
            foreach (var role in roles)
            {
                claims.Add(new Claim("roles", role));
            }
            var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetValue<String>("JwtSecretKey")));
            var signinCredentials = new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256);

            var jwt = new JwtSecurityToken(
                signingCredentials: signinCredentials,
                expires: DateTime.Now.AddDays(10),
                claims: claims
           );
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
        public void DeleteToken(UserEntity user)
        {
          
            user.PasswordHash = null;
        }
        }
}