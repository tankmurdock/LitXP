import type { Book } from "@/types";

export const SAMPLE_BOOKS: Book[] = [
  {
    id: "romeo-and-juliet",
    title: "Romeo and Juliet",
    author: "William Shakespeare",
    year: 1597,
    genre: "Tragedy",
    difficulty: "advanced",
    coverUrl: "",
    description:
      "Two young lovers from feuding families defy fate in Shakespeare's most famous tragedy. A timeless story of passion, conflict, and the devastating cost of hatred.",
    totalWords: 24000,
    estimatedMinutes: 180,
    chapters: [
      {
        id: "rj-prologue",
        bookId: "romeo-and-juliet",
        number: 0,
        title: "Prologue",
        wordCount: 110,
        content: `<p class="italic text-center mb-6">Two households, both alike in dignity,<br/>In fair Verona, where we lay our scene,<br/>From ancient grudge break to new mutiny,<br/>Where civil blood makes civil hands unclean.<br/>From forth the fatal loins of these two foes<br/>A pair of star-cross'd lovers take their life;<br/>Whose misadventured piteous overthrows<br/>Do with their death bury their parents' strife.<br/>The fearful passage of their death-mark'd love,<br/>And the continuance of their parents' rage,<br/>Which, but their children's end, nought could remove,<br/>Is now the two hours' traffic of our stage;<br/>The which if you with patient ears attend,<br/>What here shall miss, our toil shall strive to mend.</p>`,
      },
      {
        id: "rj-act1-scene1",
        bookId: "romeo-and-juliet",
        number: 1,
        title: "Act I, Scene 1",
        wordCount: 2800,
        content: `<h3 class="text-lg font-semibold mb-4">Verona. A public place.</h3>
<p class="mb-2 text-muted-foreground italic">Enter SAMPSON and GREGORY, of the house of Capulet, armed with swords and bucklers</p>
<p class="mb-4"><strong>SAMPSON:</strong> Gregory, o' my word, we'll not carry coals.</p>
<p class="mb-4"><strong>GREGORY:</strong> No, for then we should be colliers.</p>
<p class="mb-4"><strong>SAMPSON:</strong> I mean, an we be in choler, we'll draw.</p>
<p class="mb-4"><strong>GREGORY:</strong> Ay, while you live, draw your neck out o' the collar.</p>
<p class="mb-4"><strong>SAMPSON:</strong> I strike quickly, being moved.</p>
<p class="mb-4"><strong>GREGORY:</strong> But thou art not quickly moved to strike.</p>
<p class="mb-4"><strong>SAMPSON:</strong> A dog of the house of Montague moves me.</p>
<p class="mb-4"><strong>GREGORY:</strong> To move is to stir; and to be valiant is to stand: therefore, if thou art moved, thou runn'st away.</p>
<p class="mb-4"><strong>SAMPSON:</strong> A dog of that house shall move me to stand: I will take the wall of any man or maid of Montague's.</p>
<p class="mb-2 text-muted-foreground italic">Enter ABRAHAM and BALTHASAR</p>
<p class="mb-4"><strong>SAMPSON:</strong> My naked weapon is out: quarrel, I will back thee.</p>
<p class="mb-4"><strong>GREGORY:</strong> How! turn thy back and run?</p>
<p class="mb-4"><strong>SAMPSON:</strong> Fear me not.</p>
<p class="mb-4"><strong>GREGORY:</strong> No, marry; I fear thee!</p>
<p class="mb-4"><strong>SAMPSON:</strong> Nay, as they dare. I will bite my thumb at them; which is a disgrace to them, if they bear it.</p>
<p class="mb-4"><strong>ABRAHAM:</strong> Do you bite your thumb at us, sir?</p>
<p class="mb-4"><strong>SAMPSON:</strong> I do bite my thumb, sir.</p>
<p class="mb-4"><strong>ABRAHAM:</strong> Do you bite your thumb at us, sir?</p>
<p class="mb-4"><strong>SAMPSON:</strong> No, sir, I do not bite my thumb at you, sir, but I bite my thumb, sir.</p>`,
      },
      {
        id: "rj-act2-scene2",
        bookId: "romeo-and-juliet",
        number: 2,
        title: "Act II, Scene 2 \u2014 The Balcony",
        wordCount: 1200,
        content: `<h3 class="text-lg font-semibold mb-4">Capulet's orchard.</h3>
<p class="mb-2 text-muted-foreground italic">Enter ROMEO</p>
<p class="mb-4"><strong>ROMEO:</strong> But, soft! what light through yonder window breaks?<br/>It is the east, and Juliet is the sun.<br/>Arise, fair sun, and kill the envious moon,<br/>Who is already sick and pale with grief,<br/>That thou her maid art far more fair than she:<br/>Be not her maid, since she is envious;<br/>Her vestal livery is but sick and green<br/>And none but fools do wear it; cast it off.<br/>It is my lady, O, it is my love!<br/>O, that she knew she were!</p>
<p class="mb-4"><strong>JULIET:</strong> O Romeo, Romeo! wherefore art thou Romeo?<br/>Deny thy father and refuse thy name;<br/>Or, if thou wilt not, be but sworn my love,<br/>And I'll no longer be a Capulet.</p>
<p class="mb-4"><strong>JULIET:</strong> 'Tis but thy name that is my enemy;<br/>Thou art thyself, though not a Montague.<br/>What's Montague? it is nor hand, nor foot,<br/>Nor arm, nor face, nor any other part<br/>Belonging to a man. O, be some other name!<br/>What's in a name? that which we call a rose<br/>By any other name would smell as sweet;<br/>So Romeo would, were he not Romeo call'd,<br/>Retain that dear perfection which he owes<br/>Without that title. Romeo, doff thy name,<br/>And for that name which is no part of thee<br/>Take all myself.</p>
<p class="mb-4"><strong>ROMEO:</strong> I take thee at thy word:<br/>Call me but love, and I'll be new baptized;<br/>Henceforth I never will be Romeo.</p>`,
      },
    ],
  },
  {
    id: "the-great-gatsby",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    genre: "Fiction",
    difficulty: "intermediate",
    coverUrl: "",
    description:
      "A mysterious millionaire, a lost love, and the hollow promise of the American Dream. Gatsby's tragic pursuit reveals the corruption beneath the glittering surface of wealth.",
    totalWords: 47000,
    estimatedMinutes: 300,
    chapters: [
      {
        id: "gg-ch1",
        bookId: "the-great-gatsby",
        number: 1,
        title: "Chapter 1",
        wordCount: 6200,
        content: `<p class="mb-4">In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.</p>
<p class="mb-4">"Whenever you feel like criticizing anyone," he told me, "just remember that all the people in this world haven't had the advantages that you've had."</p>
<p class="mb-4">He didn't say any more, but we've always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that. In consequence, I'm inclined to reserve all judgments, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores.</p>
<p class="mb-4">And, after boasting this way of my tolerance, I come to the admission that it has a limit. Conduct may be founded on the hard rock or the wet marshes, but after a certain point I don't care what it's founded on. When I came back from the East last autumn I felt that I wanted the world to be in uniform and at a sort of moral attention forever; I wanted no more riotous excursions with privileged glimpses into the human heart.</p>`,
      },
    ],
  },
  {
    id: "frankenstein",
    title: "Frankenstein",
    author: "Mary Shelley",
    year: 1818,
    genre: "Gothic Horror",
    difficulty: "intermediate",
    coverUrl: "",
    description:
      "A young scientist creates a sapient creature in an unorthodox experiment. Shelley's masterpiece explores ambition, isolation, and what it means to be human.",
    totalWords: 75000,
    estimatedMinutes: 480,
    chapters: [
      {
        id: "frank-letter1",
        bookId: "frankenstein",
        number: 1,
        title: "Letter 1",
        wordCount: 1200,
        content: `<p class="mb-4 text-muted-foreground italic">St. Petersburgh, Dec. 11th, 17\u2014</p>
<p class="mb-4">You will rejoice to hear that no disaster has accompanied the commencement of an enterprise which you have regarded with such evil forebodings. I arrived here yesterday, and my first task is to assure my dear sister of my welfare and increasing confidence in the success of my undertaking.</p>
<p class="mb-4">I am already far north of London, and as I walk in the streets of Petersburgh, I feel a cold northern breeze play upon my cheeks, which braces my nerves and fills me with delight. Do you understand this feeling? This breeze, which has travelled from the regions towards which I am advancing, gives me a foretaste of those icy climes.</p>
<p class="mb-4">I try in vain to be persuaded that the pole is the seat of frost and desolation; it ever presents itself to my imagination as the region of beauty and delight. There, Margaret, the sun is for ever visible, its broad disk just skirting the horizon and diffusing a perpetual splendour.</p>`,
      },
    ],
  },
];
