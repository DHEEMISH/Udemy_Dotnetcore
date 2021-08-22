using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;
        }


        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Registers(RegisterDTO registerDto)
        {
            if (await UserExists(registerDto.UserName)) 
            return BadRequest("UserName is already taken");
            
            using var hwin = new HMACSHA512();
            var user = new AppUser
            {
                UserName = registerDto.UserName.ToLower(),
                passwordHash = hwin.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                passwordSalt = hwin.Key
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
           return user;
        }


        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> LoginUser(LoginDTO loginDTO)
        {
            var user = await _context.Users
            .Include(p=>p.Photos)
              .SingleOrDefaultAsync(x => x.UserName == loginDTO.UserName.ToLower());

            if (user == null)
            {
                return Unauthorized("Invalid UserName");
            }

            using var hwin = new HMACSHA512(user.passwordSalt);
            var computeHash = hwin.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));


            for (int i = 0; i < computeHash.Length; i++)
            {
                if (computeHash[i] != user.passwordHash[i])
                {
                    return Unauthorized("Invalid password");
                }
            }

             return new UserDTO
            {

                UserName = user.UserName,
                token = _tokenService.CreateToken(user)
                ,
                PhotoUrl =user.Photos.FirstOrDefault(x=>x.IsMain)?.Url                
            };
        }
        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}