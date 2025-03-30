// data/mockData.ts

export const mockUsers = [
    {
        p_id: 'user1',
        username: 'Wonderful_Law_0612',
        avatar_url: "/general/image.png",
        created_at: '2023-01-01T00:00:00Z',
    },

    {
        p_id: 'user2',
        username: 'john_doe',
        avatar_url: '/general/image2.jpg',
        created_at: '2023-02-01T00:00:00Z',
    },
    {
        p_id: 'user3',
        username: 'tech_guy',
        avatar_url: '/general/image4.png',
        created_at: '2023-03-01T00:00:00Z',
    },
    {
        p_id: 'user4',
        username: 'art_lover',
        avatar_url: '/general/image4.png',
        created_at: '2023-04-01T00:00:00Z',
    },
    
    // Các user khác không cần thay đổi
];

export const mockFollows = [
    { id: 1, follower_id: 1, following_id: 2, followed_at: "2023-10-01T10:00:00Z" }, // Người dùng A (id=1) theo dõi người dùng B (id=2)
    { id: 2, follower_id: 3, following_id: 2, followed_at: "2023-10-02T11:00:00Z" }, // Người dùng C (id=3) theo dõi người dùng B (id=2)
  ];

export const mockPosts = [
    {
        p_id: 'post1',
        title: 'Post by John Doe',
        content: "This is John's post...",
        user_id: 'user2', // Posted by john_doe
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        thumbnail_url: '/general/cover1.jpg',
        updated_at: '2023-03-01T00:00:00Z',
        subcredit_id: 'sub1',
        upvots_count: 10,
        downvots_count: 2,
        share_count: 5,
        comment_count: 6
    },
    {
        p_id: 'post2',
        title: 'Post by Wonderful Law',
        content: "This is Wonderful Law's post...",
        user_id: 'user1', // Posted by Wonderful_Law_0612
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        thumbnail_url: '/general/cover2.jpg',
        updated_at: '2023-03-06T00:00:00Z',
        subcredit_id: 'sub1',
        upvots_count: 12,
        downvots_count: 0,
        share_count: 7,
        comment_count: 0
    },
    {
        p_id: 'post5',
        title: 'My Daily Fitness Routine',
        content: "Fitness is not just about being in shape; it's a lifestyle. Here's my daily routine that includes exercises, meals, and tips on staying motivated.",
        thumbnail_url: null,
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        updated_at: '2023-03-05T00:00:00Z',
        user_id: 'user1', // Wonderful_Law_0612
        subcredit_id: 'sub1',
        upvots_count: 8,
        downvots_count: 1,
        share_count: 4,
        comment_count: 6
    },
    {
        p_id: 'post6',
        title: 'Thoughts on Tech',
        content: 'JavaScript is a versatile language that you can use for web development. In this article, I will guide you through the basics of JavaScript and demonstrate how to write your first program.',
        thumbnail_url: '/general/cover2.jpg',
        created_at: '2023-03-06T00:00:00Z',
        updated_at: '2023-03-06T00:00:00Z',
        user_id: 'user1', // Wonderful_Law_0612
        subcredit_id: 'sub1',
        upvots_count: 12,
        downvots_count: 0,
        share_count: 7,
        comment_count: 0

    },

    {
        p_id: 'post15', // Đổi ID để không trùng với post cũ
        title: 'The Future of AI',
        content: "With my ever-growing videos and photos, I really got fed up with cloud storages like Google Photos or iCloud. Also, didn't want my naked pictures to be leaked from iCloud 😆, so I switched to self-hosting the Immich. Here is my setup: 💻 Server: Beelink Mini PC N100 Initially, I tested everything on a Raspberry Pi 4, which worked fine, but since I needed to host other services, I opted for a more powerful machine.",
        thumbnail_url: null,
        created_at: '2023-03-07T00:00:00Z',
        updated_at: '2023-03-07T00:00:00Z',
        user_id: 'user1', // Wonderful_Law_0612
        subcredit_id: 'sub1',
        upvots_count: 15,
        downvots_count: 3,
        share_count: 10,
        comment_count: 8
    },
    {
        p_id: 'post16', // Đổi ID để không trùng với post cũ
        title: 'Healthy Eating Habits',
        content: 'Tips for maintaining a healthy diet in a busy lifestyle.',
        thumbnail_url: '/general/cover3.jpg',
        created_at: '2023-03-08T00:00:00Z',
        updated_at: '2023-03-08T00:00:00Z',
        user_id: 'user1', // Wonderful_Law_0612
        subcredit_id: 'sub1',
        upvots_count: 7,
        downvots_count: 2,
        share_count: 3,
        comment_count: 4
    },
    {
        p_id: 'post17', // Đổi ID để không trùng với post cũ
        title: 'Minimalist Living',
        content: 'How to embrace minimalism and simplify your life.',
        thumbnail_url: null,
        created_at: '2023-03-09T00:00:00Z',
        updated_at: '2023-03-09T00:00:00Z',
        user_id: 'user1', // Wonderful_Law_0612
        subcredit_id: 'sub1',
        upvots_count: 5,
        downvots_count: 1,
        share_count: 2,
        comment_count: 3
    },
    {
        p_id: 'post18', // Đổi ID để không trùng với post cũ
        title: 'The Art of Public Speaking',
        content: 'Mastering the skills needed for effective public speaking.',
        thumbnail_url: null,
        created_at: '2023-03-10T00:00:00Z',
        updated_at: '2023-03-10T00:00:00Z',
        user_id: 'user1', // Wonderful_Law_0612
        subcredit_id: 'sub1',
        upvots_count: 20,
        downvots_count: 5,
        share_count: 15,
        comment_count: 12
    },
    {
        p_id: 'post19', // Đổi ID để không trùng với post cũ
        title: 'Exploring Space',
        content: 'The latest advancements in space exploration.',
        thumbnail_url: null,
        created_at: '2023-03-11T00:00:00Z',
        updated_at: '2023-03-11T00:00:00Z',
        user_id: 'user1', // Wonderful_Law_0612
        subcredit_id: 'sub1',
        upvots_count: 9,
        downvots_count: 4,
        share_count: 6,
        comment_count: 5
    },
    {
        p_id: 'post20', // Đổi ID để không trùng với post cũ
        title: 'The Benefits of Yoga',
        content: 'How yoga can improve your physical and mental health.',
        thumbnail_url: null,
        created_at: '2023-03-12T00:00:00Z',
        updated_at: '2023-03-12T00:00:00Z',
        user_id: 'user1', // Wonderful_Law_0612
        subcredit_id: 'sub1',
        upvots_count: 11,
        downvots_count: 2,
        share_count: 8,
        comment_count: 7
    },
    {
        p_id: 'post21', // Đổi ID để không trùng với post cũ
        title: 'Digital Detox',
        content: 'Why and how to take a break from digital devices.',
        thumbnail_url: null,
        created_at: '2023-03-13T00:00:00Z',
        updated_at: '2023-03-13T00:00:00Z',
        user_id: 'user1', // Wonderful_Law_0612
        subcredit_id: 'sub1',
        upvots_count: 6,
        downvots_count: 3,
        share_count: 4,
        comment_count: 2
    },
    {
        p_id: 'post22', // Đổi ID để không trùng với post cũ
        title: 'The Power of Reading',
        content: 'How reading can transform your life.',
        thumbnail_url: null,
        created_at: '2023-03-14T00:00:00Z',
        updated_at: '2023-03-14T00:00:00Z',
        user_id: 'user1', // Wonderful_Law_0612
        subcredit_id: 'sub1',
        upvots_count: 14,
        downvots_count: 1,
        share_count: 9,
        comment_count: 10
    },
    {
        p_id: 'post23', // Đổi ID để không trùng với post cũ
        title: 'The Importance of Sleep',
        content: 'Why getting enough sleep is crucial for your health.',
        thumbnail_url: null,
        created_at: '2023-03-15T00:00:00Z',
        updated_at: '2023-03-15T00:00:00Z',
        user_id: 'user1', // Wonderful_Law_0612
        subcredit_id: 'sub1',
        upvots_count: 10,
        downvots_count: 2,
        share_count: 5,
        comment_count: 6
    },
    {
        p_id: 'post24', // Đổi ID để không trùng với post cũ
        title: 'The Joy of Cooking',
        content: 'Discover the joy of cooking at home.',
        thumbnail_url: null,
        created_at: '2023-03-16T00:00:00Z',
        updated_at: '2023-03-16T00:00:00Z',
        user_id: 'user1', // Wonderful_Law_0612
        subcredit_id: 'sub1',
        upvots_count: 8,
        downvots_count: 1,
        share_count: 4,
        comment_count: 3
    },
    {
        p_id: 'post25',
        title: 'My Journey with React',
        content: 'Here is my experience learning React and building applications...',
        thumbnail_url: null,
        created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: null,
        user_id: 'user2', // john_doe's posts
        subcredit_id: 'sub1',
        upvots_count: 25,
        downvots_count: 3,
        share_count: 8,
        comment_count: 12
    },
    {
        p_id: 'post26',
        title: 'Web Development Best Practices',
        content: 'Essential tips for modern web development...',
        thumbnail_url: null,
        created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: null,
        user_id: 'user2', // john_doe's posts
        subcredit_id: 'sub1',
        upvots_count: 18,
        downvots_count: 2,
        share_count: 5,
        comment_count: 7
    },
    {
        p_id: 'post30',
        title: 'Getting Started with Next.js',
        content: "Here's my guide to getting started with Next.js...",
        thumbnail_url: null,
        created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: null,
        user_id: 'user2', // john_doe's ID
        subcredit_id: 'sub1',
        upvots_count: 30,
        downvots_count: 2,
        share_count: 10,
        comment_count: 15
    },
    {
        p_id: 'post31',
        title: 'TypeScript Tips and Tricks',
        content: 'Advanced TypeScript features you should know...',
        thumbnail_url: null,
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: null,
        user_id: 'user2', // john_doe's ID
        subcredit_id: 'sub1',
        upvots_count: 25,
        downvots_count: 1,
        share_count: 8,
        comment_count: 12
    }
];
     

export const mockVotes = [
    {
        p_id: 'vote1',
        user_id: 'user1', // Wonderful_Law_0612 voted
        post_id: 'post1', // on John's post
        vote_type: 1,
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        p_id: 'vote2',
        user_id: 'user2', // john_doe voted
        post_id: 'post2', // on Wonderful Law's post
        vote_type: 1,
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        p_id: 'vote3',
        user_id: 'user1', // Thêm lượt upvote từ user1 cho post5
        post_id: 'post5',
        vote_type: 0, // upvote
        created_at: '2023-03-05T01:00:00Z',
    },
    {
        p_id: 'vote4',
        user_id: 'user4', // art_lover
        post_id: 'post5',
        vote_type: 0, // downvote
        created_at: '2023-03-07T01:00:00Z',
    },
    //

    {
        p_id: 'vote5',
        user_id: 'user1', // Wonderful_Law_0612
        post_id: 'post15',
        vote_type: null, // upvote
        created_at: '2023-03-01T01:00:00Z',
    },
    {
        p_id: 'vote6',
        user_id: 'user1', // Thêm lượt upvote từ user1 cho post5
        post_id: 'post16',
        vote_type: 1, // upvote
        created_at: '2023-03-05T01:00:00Z',
    },
    {
        p_id: 'vote7',
        user_id: 'user1', // Thêm lượt upvote từ user1 cho post6
        post_id: 'post17',
        vote_type: 0, // upvote
        created_at: '2023-03-06T01:00:00Z',
    },
    {
        p_id: 'vote8',
        user_id: 'user4', // art_lover
        post_id: 'post18',
        vote_type: 0, // downvote
        created_at: '2023-03-07T01:00:00Z',
    },
    {
        p_id: 'vote9',
        user_id: 'user1', // Wonderful_Law_0612
        post_id: 'post19',
        vote_type: 0, // upvote
        created_at: '2023-03-07T02:00:00Z',
    }, 
    {
        p_id: 'vote10',
        user_id: 'user2', // john_doe's votes
        post_id: 'post1',
        vote_type: 1, // upvote
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        p_id: 'vote11',
        user_id: 'user2',
        post_id: 'post5',
        vote_type: 1,
        created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        p_id: 'vote12',
        user_id: 'user2',
        post_id: 'post15',
        vote_type: -1, // downvote
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        p_id: 'vote20',
        user_id: 'user2', // john_doe voting
        post_id: 'post30', // voting on his own post
        vote_type: 1,
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        p_id: 'vote21',
        user_id: 'user2',
        post_id: 'post1', // voting on Wonderful_Law's post
        vote_type: 1,
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    // Downvotes (vote_type: 0)
    {
        p_id: 'vote30',
        user_id: 'user2', // john_doe
        post_id: 'post15',
        vote_type: 0, // Changed to 0 for downvote
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        p_id: 'vote31',
        user_id: 'user2',
        post_id: 'post16',
        vote_type: 0,
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        p_id: 'vote32',
        user_id: 'user1', // Wonderful_Law_0612
        post_id: 'post20',
        vote_type: 0,
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    }
];

export interface SavedPost {
    save_id: string;
    user_id: string;
    post_id: string;
    saved_at: string;
}

export const mockSavedPosts = [
    {
        save_id: "save1",
        user_id: "user2", // john_doe
        post_id: "post1", // This should be unique
        saved_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        save_id: "save2",
        user_id: "user2",
        post_id: "post2", // Different post
        saved_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        save_id: "save3",
        user_id: "user1",
        post_id: "post5",
        saved_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        save_id: "save4",
        user_id: "user1",
        post_id: "post6",
        saved_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        save_id: "save5",
        user_id: "user2", // john_doe's saved posts
        post_id: "post1",
        saved_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        save_id: "save6",
        user_id: "user2",
        post_id: "post6",
        saved_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        save_id: "save7",
        user_id: "user2",
        post_id: "post15",
        saved_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        save_id: "save10",
        user_id: "user2", // john_doe saving
        post_id: "post1", // saving Wonderful_Law's post
        saved_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        save_id: "save11",
        user_id: "user2",
        post_id: "post30", // saving his own post
        saved_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    }
];

export const mockComments = [
    {
        comment_id: 'comment1',
        post_id: 'post1',
        user_id: 'user1',
        content: 'This is a great post! I really enjoyed reading it.',
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        parent_comment_id: null
    },
    {
        comment_id: 'comment2',
        post_id: 'post2',
        user_id: 'user1',
        content: 'I disagree with this point. Here\'s why...',
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        parent_comment_id: null
    },
    {
        comment_id: 'comment3',
        post_id: 'post3',
        user_id: 'user2',
        content: 'Interesting perspective!',
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        parent_comment_id: null
    },
    {
        comment_id: 'comment4',
        post_id: 'post3',
        user_id: 'user1',
        content: 'Thanks for sharing your thoughts!',
        created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        parent_comment_id: 'comment3'
    }
];