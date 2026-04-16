// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Define your collection(s)
const blogCollection = defineCollection({
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    snippet: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    publishDate: z.string().transform(str => new Date(str)),
    author: z.string().default('Astroship'),
    category: z.string(),
    tags: z.array(z.string()),
  }),
});

const teamCollection = defineCollection({
  schema: z.object({
    draft: z.boolean().default(false),
    name: z.string(),
    biography: z.string(),
    avatar: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    publishDate: z.coerce.date(),
  }),
});

const buttonStyleSchema = z.enum(["primary", "outline", "inverted", "muted"]);
const sponsorTypeSchema = z.enum([
  "sponsors_donors",
  "rescue_and_shelter_partners",
  "veterinary_partners",
]);
const infoCardToneSchema = z.enum(["sand", "sky", "sage", "ink"]);

const sponsorsCollection = defineCollection({
  schema: z.object({
    draft: z.boolean().default(false),
    name: z.string(),
    description: z.string(),
    type: sponsorTypeSchema,
    sortOrder: z.number().default(100),
    website: z.string().url().optional(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
  }),
});

const pagesCollection = defineCollection({
  schema: z.object({
    draft: z.boolean().default(false),
    title: z.string(),
    description: z.string().default(""),
    navLabel: z.string().optional(),
    showInNav: z.boolean().default(true),
    navOrder: z.number().default(100),
    sections: z.array(
      z.discriminatedUnion("type", [
        z.object({
          type: z.literal("hero"),
          eyebrow: z.string().default(""),
          headline: z.string(),
          body: z.string().default(""),
          align: z.enum(["left", "center"]).default("center"),
          primaryCtaLabel: z.string().default(""),
          primaryCtaHref: z.string().default(""),
          primaryCtaStyle: buttonStyleSchema.default("primary"),
          secondaryCtaLabel: z.string().default(""),
          secondaryCtaHref: z.string().default(""),
          secondaryCtaStyle: buttonStyleSchema.default("outline"),
        }),
        z.object({
          type: z.literal("full_width_banner"),
          eyebrow: z.string().default(""),
          headline: z.string(),
          body: z.string().default(""),
          image: z.object({
            src: z.string(),
            alt: z.string(),
          }),
          primaryCtaLabel: z.string().default(""),
          primaryCtaHref: z.string().default(""),
          primaryCtaStyle: buttonStyleSchema.default("primary"),
          secondaryCtaLabel: z.string().default(""),
          secondaryCtaHref: z.string().default(""),
          secondaryCtaStyle: buttonStyleSchema.default("outline"),
        }),
        z.object({
          type: z.literal("text"),
          title: z.string(),
          body: z.string().default(""),
          align: z.enum(["left", "center"]).default("left"),
        }),
        z.object({
          type: z.literal("image_text"),
          title: z.string(),
          body: z.string().default(""),
          image: z.object({
            src: z.string(),
            alt: z.string(),
          }),
          imageSide: z.enum(["left", "right"]).default("right"),
        }),
        z.object({
          type: z.literal("cta"),
          title: z.string(),
          body: z.string().default(""),
          buttonLabel: z.string(),
          buttonHref: z.string(),
          buttonStyle: buttonStyleSchema.default("inverted"),
        }),
        z.object({
          type: z.literal("feature_grid"),
          title: z.string(),
          body: z.string().default(""),
          features: z.array(
            z.object({
              title: z.string(),
              description: z.string(),
              stepNumber: z.number().int().positive().optional(),
              icon: z.string().default(""),
            })
          ).default([]),
        }),
        z.object({
          type: z.literal("logo_cloud"),
          title: z.string(),
          logos: z.array(
            z.object({
              icon: z.string(),
              label: z.string().default(""),
            })
          ).default([]),
        }),
        z.object({
          type: z.literal("linked_content_list"),
          title: z.string(),
          body: z.string().default(""),
          items: z.array(
            z.object({
              eyebrow: z.string().default(""),
              title: z.string(),
              description: z.string().default(""),
              image: z.object({
                src: z.string(),
                alt: z.string(),
              }),
              linkLabel: z.string(),
              linkHref: z.string(),
            })
          ).default([]),
        }),
        z.object({
          type: z.literal("image_carousel"),
          eyebrow: z.string().default(""),
          title: z.string(),
          body: z.string().default(""),
          autoplay: z.boolean().default(false),
          showNavigation: z.boolean().default(true),
          showPagination: z.boolean().default(true),
          mobileSlidesPerView: z.number().default(1.1),
          tabletSlidesPerView: z.number().default(2),
          desktopSlidesPerView: z.number().default(3),
          spaceBetween: z.number().default(24),
          imageAspect: z.enum(["square", "landscape", "portrait", "wide"]).default("landscape"),
          slides: z.array(
            z.object({
              image: z.object({
                src: z.string(),
                alt: z.string(),
              }),
              title: z.string().default(""),
              description: z.string().default(""),
            })
          ).min(1),
        }),
        z.object({
          type: z.literal("embed"),
          embedCode: z.string(),
          maxWidth: z.enum(["md", "lg", "full"]).default("lg"),
        }),
        z.object({
          type: z.literal("info_card_list"),
          eyebrow: z.string().default(""),
          title: z.string(),
          body: z.string().default(""),
          items: z.array(
            z.object({
              eyebrow: z.string().default(""),
              title: z.string(),
              body: z.string().default(""),
              tone: infoCardToneSchema.default("sand"),
            })
          ).default([]),
        }),
        z.object({
          type: z.literal("sponsor_list"),
          title: z.string(),
          body: z.string().default(""),
          types: z.array(sponsorTypeSchema).default([]),
        }),
        z.object({
          type: z.literal("contact"),
          eyebrow: z.string().default(""),
          title: z.string(),
          body: z.string().default(""),
          formIntro: z.string().default(""),
          contactHeading: z.string().default(""),
          email: z.string().default(""),
          phone: z.string().default(""),
          address: z.string().default(""),
        }),
        z.object({
          type: z.literal("team_members"),
          eyebrow: z.string().default(""),
          title: z.string(),
          body: z.string().default(""),
        }),
      ])
    ).default([]),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'blog': blogCollection,
  'sponsors': sponsorsCollection,
  'team': teamCollection,
  'pages': pagesCollection,
};
