using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    [Authorize]
    public class UsersController : BaseApiController
    {

        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;

        }

        //[AllowAnonymous]
        [HttpGet]
        // [EnableCors("CorsPolicy")]
        public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers()
        {
            var users = await _userRepository.GetMembersAsync();
         //   var userstoReturn=_mapper.Map<IEnumerable<MemberDTO>>(users);
            return Ok(users);
        }
        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDTO>> GetUser(string username)
        {
            return await _userRepository.GetMemberAsync(username);
         //   return _mapper.Map<MemberDTO>(user);

        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDTO memberUpdateDTO)
        {
            var username=User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user= await _userRepository.GetUserbyNameAsync(username);
            _mapper.Map(memberUpdateDTO,user);
            _userRepository.Update(user);

            if(await _userRepository.SaveAllAsync()) return NoContent();
            return BadRequest("failed to update"); 

        }
    }
}