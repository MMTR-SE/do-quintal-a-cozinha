/**
 * Story type definitions with region and media relations.
 */

export type Region = ({
  id: string;
  name: string;
})

export type StoryMedia = ({
    media: {
        url: string;
    }; } & {
        storyId: string;
        mediaId: string;
    })

export interface Story {
  id: string;
  title: string;
  name: string;
  description: string;
  slug: string;
  content: string;
  region: Region;
  media: StoryMedia[];
}
 
