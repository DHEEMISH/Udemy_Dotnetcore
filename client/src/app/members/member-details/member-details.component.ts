import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { MembersService } from 'src/app/Services/members.service';
import { Member } from 'src/app/_models/member';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css'],
  
})
export class MemberDetailsComponent implements OnInit {

  member: Member;
   galleryOptions: NgxGalleryOptions[];
   galleryImages: NgxGalleryImage[];
  constructor(private memberService: MembersService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.loadmember();
   
    this.galleryOptions=[
    {
        width:'500px',
        height:'500px',
        imagePercent:100,
        thumbnailsColumns:4,
        imageAnimation:NgxGalleryAnimation.Slide,
        preview:false

    }
  ]

 
  }


  getimages() :NgxGalleryImage[]
  {
    const imageUrls=[];
    for(const photo of this.member.photos)
    {
        imageUrls.push({
          small: photo?.url,
          medium:photo?.url,
          big:photo?.url
        }

        )
    }

    return imageUrls;
  }
 
  
  loadmember()
  {
    this.memberService.getMemeber(this.route.snapshot.paramMap.get('username')).subscribe(member=>{
      
      this.member=member;
      console.log(this.member.username + " " + "user");
      this.galleryImages=this.getimages();
 
     
    })
    
  }
}
