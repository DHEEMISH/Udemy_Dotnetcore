using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetUsersAsync();
        
        Task<AppUser> GetUserbyIdAsync(int id);
        Task<AppUser> GetUserbyNameAsync(string username);
         Task<IEnumerable<MemberDTO>> GetMembersAsync();
          Task<MemberDTO> GetMemberAsync(string username);
    }
}