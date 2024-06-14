/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('characters').del()
  await knex('characters').insert([
    {
      manager_id: '1',
      name: 'Sir Spamalot',
      bio: 'A knight who crusades against boring emails and bad jokes.',
      evil_points: 5,
      good_points: 85,
      img_url:
        'https://s.yimg.com/ny/api/res/1.2/hKt8H4eikqEKzjM8I2Q3Dg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTY0MDtjZj13ZWJw/https://media.zenfs.com/en/deadline.com/3980fa5eed2f60aa3d0abac4d0d205a6',
    },
    {
      manager_id: '1',
      name: 'Lady Laughs-a-Lot',
      bio: 'A sorceress whose laugh is so contagious it can cure sadness.',
      evil_points: 2,
      good_points: 90,
      img_url:
        'https://cdn.openart.ai/published/nTF9iBlw1E2ZdjDlRlvy/gE1OPduW_Dk6C_512.webp',
    },
    {
      manager_id: '2',
      name: 'Lord Procrastinator',
      bio: 'A villain who always delays his evil plans until tomorrow.',
      evil_points: 70,
      good_points: 10,
      img_url:
        'https://pics.craiyon.com/2024-01-01/640H0qXNSc6Fpl9GOull9g.webp',
    },
    {
      manager_id: '2',
      name: 'Captain Clumsy',
      bio: 'A hero who saves the day but usually trips over his own feet in the process.',
      evil_points: 3,
      good_points: 80,
      img_url:
        'https://ik.imagekit.io/storybird/images/88f4216e-aa74-4057-af72-dfe2c4fe2767/32_745742522.png',
    },
    {
      manager_id: '2',
      name: 'Mistress Misplace',
      bio: "A villainess who causes chaos by hiding everyone's keys and remote controls.",
      evil_points: 60,
      good_points: 5,
      img_url:
        'https://hips.hearstapps.com/hmg-prod/images/maleficent-2-angelina-jolie-2-1557844235.jpg',
    },
    {
      manager_id: '3',
      name: 'The Hangry Hulk',
      bio: "A mild-mannered guy who turns into a ravenous monster when he's hungry.",
      evil_points: 50,
      good_points: 30,
      img_url:
        'https://img.freepik.com/premium-photo/medieval-knight-armor-stands-with-hamburger-his-hands-against-background-castle_217593-30973.jpg',
    },
    {
      manager_id: '4',
      name: 'Princess Puns-a-Lot',
      bio: 'A princess whose puns are so powerful they can defeat any foe.',
      evil_points: 1,
      good_points: 85,
      img_url:
        'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/de3e249e-f1c6-4563-8dae-c76c1b8490d5/31fd274f-d650-400f-be83-fb8345ef7612.png',
    },
    {
      manager_id: '3',
      name: 'Major Mayhem',
      bio: 'A chaotic force who loves to create messes but has a heart of gold.',
      evil_points: 40,
      good_points: 45,
      img_url:
        'https://i.pinimg.com/736x/5a/54/b8/5a54b8dabe3288c84bf7d4ea845c56d0.jpg',
    },
    {
      manager_id: '4',
      name: 'Count Clueless',
      bio: 'A bumbling villain who never quite understands his own evil schemes.',
      evil_points: 55,
      good_points: 10,
      img_url:
        'https://static.wikia.nocookie.net/villains/images/b/b6/CountRugen.png',
    },
  ])
}
