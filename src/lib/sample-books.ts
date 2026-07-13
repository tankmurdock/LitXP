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
<p class="mb-4">And, after boasting this way of my tolerance, I come to the admission that it has a limit. Conduct may be founded on the hard rock or the wet marshes, but after a certain point I don't care what it's founded on. When I came back from the East last autumn I felt that I wanted the world to be in uniform and at a sort of moral attention forever; I wanted no more riotous excursions with privileged glimpses into the human heart.</p>
<p class="mb-4">My family have been prominent, well-to-do people in this Middle Western city for three generations. The Carraways are something of a clan, and we have a tradition that we're descended from the Dukes of Buccleuch, but the actual founder of my line was my grandfather's brother, who came here in fifty-one, sent a substitute to the Civil War, and started the wholesale hardware business that my father carries on to-day.</p>
<p class="mb-4">I graduated from New Haven in 1915, just a quarter of a century after my father, and a little later I participated in that delayed Teutonic migration known as the Great War. I enjoyed the counter-raid so thoroughly that I came back restless. Instead of being the warm centre of the world, the Middle West now seemed like the ragged edge of the universe\u2014so I decided to go East and learn the bond business.</p>
<p class="mb-4">And so it happened that on a warm windy evening I drove over to East Egg to see two old friends whom I scarcely knew at all. Their house was even more elaborate than I expected, a cheerful red-and-white Georgian Colonial mansion, overlooking the bay.</p>`,
      },
      {
        id: "gg-ch2",
        bookId: "the-great-gatsby",
        number: 2,
        title: "Chapter 2",
        wordCount: 5800,
        content: `<p class="mb-4">About half way between West Egg and New York the motor road hastily joins the railroad and runs beside it for a quarter of a mile, so as to shrink away from a certain desolate area of land. This is a valley of ashes\u2014a fantastic farm where ashes grow like wheat into ridges and hills and grotesque gardens; where ashes take the forms of houses and chimneys and rising smoke and, finally, with a transcendent effort, of men who move dimly and already crumbling through the powdery air.</p>
<p class="mb-4">Occasionally a line of gray cars crawls along an invisible track, gives out a ghastly creak, and comes to rest, and immediately the ash-gray men swarm up with leaden spades and stir up an impenetrable cloud, which screens their obscure operations from your sight.</p>
<p class="mb-4">But above the gray land and the spasms of bleak dust which drift endlessly over it, you perceive, after a moment, the eyes of Doctor T. J. Eckleburg. The eyes of Doctor T. J. Eckleburg are blue and gigantic\u2014their retinas are one yard high. They look out of no face, but, instead, from a pair of enormous yellow spectacles which pass over a nonexistent nose. Evidently some wild wag of an oculist set them there to fatten his practice in the borough of Queens, and then sank down himself into eternal blindness, or forgot them and moved away. But his eyes, dimmed a little by many paintless days, under sun and rain, brood on over the solemn dumping ground.</p>
<p class="mb-4">The valley of ashes is bounded on one side by a small foul river, and, when the drawbridge is up to let barges through, the passengers on waiting trains can stare at the dismal scene for as long as half an hour.</p>
<p class="mb-4">"Terrible place, isn't it," said Tom, exchanging a frown with Doctor Eckleburg.</p>
<p class="mb-4">We went on, passing through the Valley of Ashes. I had been brought there by Tom Buchanan for the express purpose of meeting his mistress. The fact that he had one was insisted upon wherever he was known. His acquaintances resented the fact that he turned up in popular restaurants with her and, leaving her at a table, sauntered about, chatting with whomsoever he knew.</p>`,
      },
      {
        id: "gg-ch3",
        bookId: "the-great-gatsby",
        number: 3,
        title: "Chapter 3",
        wordCount: 6100,
        content: `<p class="mb-4">There was music from my neighbor's house through the summer nights. In his blue gardens men and girls came and went like moths among the whisperings and the champagne and the stars. At high tide in the afternoon I watched his guests diving from the tower of his raft, or taking the sun on the hot sand of his beach while his two motor-boats slit the waters of the Sound, drawing aquaplanes over cataracts of foam.</p>
<p class="mb-4">On week-ends his Rolls-Royce became an omnibus, bearing parties to and from the city between nine in the morning and long past midnight, while his station wagon scampered like a brisk yellow bug to meet all trains. And on Mondays eight servants, including an extra gardener, toiled all day with mops and scrubbing-brushes and hammers and garden-shears, repairing the ravages of the night before.</p>
<p class="mb-4">Every Friday five crates of oranges and lemons arrived from a fruiterer in New York\u2014every Monday these same oranges and lemons left his back door in a pyramid of pulpless halves. There was a machine in the kitchen which could extract the juice of two hundred oranges in half an hour if a little button was pressed two hundred times by a butler's thumb.</p>
<p class="mb-4">At least once a fortnight a corps of caterers came down with several hundred feet of canvas and enough colored lights to make a Christmas tree of Gatsby's enormous garden. On buffet tables, garnished with glistening hors-d'oeuvre, spiced baked hams crowded against salads of harlequin designs and pastry pigs and turkeys bewitched to a dark gold.</p>
<p class="mb-4">I believe that on the first night I went to Gatsby's house I was one of the few guests who had actually been invited. People were not invited\u2014they went there. They got into automobiles which bore them out to Long Island, and somehow they ended up at Gatsby's door.</p>
<p class="mb-4">In my first impression of him, he seemed to be reaching for something just beyond his grasp, straining for a dream that always eluded him. When I finally met him, I found a young man of extraordinary quality\u2014with one of those rare smiles that seemed to understand you, as if it believed in you as you would like to believe in yourself.</p>`,
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
