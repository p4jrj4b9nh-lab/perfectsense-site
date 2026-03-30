import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use for Perfect Sense Productions.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      <section className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-4xl sm:text-5xl font-[200] tracking-[0.04em] leading-none mb-4">
          Terms of Use
          <span
            className="inline-block w-[12px] h-[12px] sm:w-[14px] sm:h-[14px] bg-[#0a0a0a] rounded-full ml-1"
            style={{ verticalAlign: "-0.05em" }}
            aria-hidden="true"
          />
        </h1>
        <p className="text-sm font-[200] text-[#999] mb-16">
          Last updated: March 30, 2026
        </p>

        <div className="space-y-12 text-[15px] font-[200] leading-[1.9] text-[#555]">
          <section>
            <h2 className="text-lg font-[300] text-[#0a0a0a] mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the website perfectsenseproductions.com (the &quot;Site&quot;), operated
              by Perfect Sense Productions (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you agree to be bound by
              these Terms of Use and our{" "}
              <a href="/privacy" className="text-[#0a0a0a] underline">Privacy Policy</a>,
              which is incorporated herein by reference. If you do not agree to these terms,
              please do not use the Site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-[300] text-[#0a0a0a] mb-4">2. Description of Service</h2>
            <p>
              Perfect Sense Productions is a content production company that creates AI-generated
              short-form comedy video shows. The Site serves as an informational hub for our shows,
              provides links to our social media channels, and offers email newsletter subscriptions
              and other services as they become available.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-[300] text-[#0a0a0a] mb-4">3. Eligibility</h2>
            <p>
              You must be at least 13 years of age to use this Site. By using the Site, you represent
              and warrant that you are at least 13 years old. If you are under 13, you may not use the
              Site or provide any personal information to us.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-[300] text-[#0a0a0a] mb-4">4. Intellectual Property and Proprietary Rights</h2>

            <p className="mb-4">
              <strong className="font-[400] text-[#0a0a0a]">Ownership.</strong>{" "}
              All content on this Site and across our productions — including but not limited to
              character names, character visual designs, character likenesses, character personalities
              and traits, character backstories, show names, show formats, show concepts, logos,
              taglines, scripts, dialogue, storylines, graphics, images, video, audio, and software
              (collectively, &quot;Proprietary Content&quot;) — is the exclusive property of Perfect Sense
              Productions. Our Proprietary Content is protected by United States and international
              copyright, trademark, trade dress, unfair competition, and other intellectual property
              laws, as well as by the contractual restrictions set forth in these Terms.
            </p>

            <p className="mb-4">
              <strong className="font-[400] text-[#0a0a0a]">Human Authorship and Creative Direction.</strong>{" "}
              Perfect Sense Productions utilizes artificial intelligence tools as part of its
              creative production process. All characters, shows, and content are the product of
              substantial human authorship, creative direction, and editorial judgment by Perfect
              Sense Productions. This includes, without limitation: the conception and development
              of all characters and their attributes; the writing and editing of scripts and dialogue;
              the selection, arrangement, coordination, and curation of all visual and audio outputs;
              the direction of character performances and visual aesthetics; and all creative decisions
              regarding show formats, storylines, and presentation. AI tools are used as instruments
              of production under the creative control of Perfect Sense Productions, in the same
              manner that cameras, editing software, and other production tools are used in content
              creation.
            </p>

            <p className="mb-4">
              <strong className="font-[400] text-[#0a0a0a]">Characters and Show Properties.</strong>{" "}
              The following characters and show properties are proprietary to Perfect Sense
              Productions (this list is illustrative, not exhaustive):
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong className="font-[400] text-[#0a0a0a]">DNN — Dog News Network</strong> and all associated characters, including but not limited to Barkley McSnoot, Diane Pawson, Scraps, Rex Barkington, Milton Wrinkles, Gus Sniffwell, Cheddar, Sunny, Blitz, Sloane, Duchess, Coco, Winston, Arlo Woofman, Steele Barkwell, Chip, Vera, Vita, Nigel, and Knox</li>
              <li><strong className="font-[400] text-[#0a0a0a]">Sit Stay Spill</strong> and all associated characters, including but not limited to Pepper and Sage</li>
              <li><strong className="font-[400] text-[#0a0a0a]">The Yard</strong> and all associated characters, including but not limited to Tank and Lou</li>
              <li><strong className="font-[400] text-[#0a0a0a]">...processing</strong> and all associated characters and elements</li>
            </ul>
            <p className="mb-4">
              This includes each character&apos;s name, visual design, likeness, personality, voice
              characterization, backstory, catchphrases, and all other distinguishing attributes,
              whether individually or in combination. Perfect Sense Productions claims ownership of
              these properties under all applicable legal theories, including copyright in
              human-authored elements, trademark and trade dress rights in character names and visual
              identities, common law rights established through use and public association, and the
              contractual protections set forth herein.
            </p>

            <p className="mb-4">
              <strong className="font-[400] text-[#0a0a0a]">Restrictions on Use.</strong>{" "}
              Regardless of the intellectual property status of any individual element of our
              Proprietary Content under current or future law, by using this Site you agree — as a
              binding contractual obligation — that you will not, without the prior written consent
              of Perfect Sense Productions:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Reproduce, copy, distribute, or publicly display any Proprietary Content</li>
              <li>Create derivative works based on any Proprietary Content, including but not limited to creating content featuring our characters or show concepts</li>
              <li>Use any character name, likeness, or visual design for any commercial purpose</li>
              <li>Use any character name, likeness, or visual design in connection with any product, service, or content in a manner likely to cause confusion, dilution, or the impression of affiliation with or endorsement by Perfect Sense Productions</li>
              <li>Train, fine-tune, or otherwise use any Proprietary Content as input for any artificial intelligence, machine learning, or similar system</li>
              <li>Reproduce or imitate the distinctive visual style, format, or presentation of any of our shows</li>
            </ul>

            <p className="mb-4">
              <strong className="font-[400] text-[#0a0a0a]">Permitted Uses.</strong>{" "}
              You may:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Share links to our Site and social media content on your own social media accounts</li>
              <li>Store files automatically cached by your web browser for display purposes</li>
              <li>Create non-commercial fan content (such as fan art or commentary) that does not replicate our character designs or imply affiliation with Perfect Sense Productions, provided such use constitutes fair use under applicable law</li>
            </ul>

            <p>
              <strong className="font-[400] text-[#0a0a0a]">Reservation of Rights.</strong>{" "}
              Perfect Sense Productions reserves all rights not expressly granted in these Terms
              of Use. No license or right is granted to you by implication, estoppel, or otherwise
              under any intellectual property right owned or controlled by Perfect Sense Productions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-[300] text-[#0a0a0a] mb-4">5. Fictional Content Disclaimer</h2>
            <p>
              All characters, names, storylines, and scenarios depicted in our shows are fictional.
              Any resemblance to real persons, living or dead, or actual events is purely coincidental.
              The views and opinions expressed by characters in our shows are written for entertainment
              purposes and do not represent the views of Perfect Sense Productions, its owner(s),
              or any affiliated individuals.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-[300] text-[#0a0a0a] mb-4">6. User Conduct</h2>
            <p className="mb-4">You agree not to use the Site to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violate any applicable local, state, national, or international law or regulation</li>
              <li>Infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>Transmit any material that is defamatory, obscene, abusive, or otherwise objectionable</li>
              <li>Attempt to gain unauthorized access to the Site, other user accounts, or computer systems or networks</li>
              <li>Interfere with or disrupt the Site or servers or networks connected to the Site</li>
              <li>Use any automated means (including bots, scrapers, or spiders) to access the Site for any purpose without our express written permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-[300] text-[#0a0a0a] mb-4">7. Email Communications</h2>
            <p>
              By subscribing to our newsletter or waitlist, you consent to receive periodic email
              communications from us. You may opt out of these communications at any time by clicking
              the &quot;unsubscribe&quot; link in any email or by contacting us directly. We will process your
              opt-out request in accordance with applicable law (within 10 business days under CAN-SPAM).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-[300] text-[#0a0a0a] mb-4">8. Third-Party Links</h2>
            <p>
              The Site may contain links to third-party websites or services, including social media
              platforms. These links are provided for your convenience only. We have no control over
              and assume no responsibility for the content, privacy policies, or practices of any
              third-party websites or services. Your interactions with third-party websites are
              governed by those websites&apos; own terms and policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-[300] text-[#0a0a0a] mb-4">9. Disclaimer of Warranties</h2>
            <p>
              THE SITE AND ALL CONTENT, MATERIALS, AND SERVICES PROVIDED ON OR THROUGH THE SITE ARE
              PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS, WITHOUT ANY WARRANTIES OF ANY KIND,
              EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, WE
              DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. WE DO
              NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF
              VIRUSES OR OTHER HARMFUL COMPONENTS.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-[300] text-[#0a0a0a] mb-4">10. Limitation of Liability</h2>
            <p>
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, PERFECT SENSE PRODUCTIONS AND ITS
              OWNER(S), OFFICERS, EMPLOYEES, AGENTS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY
              INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF
              PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA,
              USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM: (A) YOUR USE OF OR INABILITY
              TO USE THE SITE; (B) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SERVERS AND/OR ANY
              PERSONAL INFORMATION STORED THEREIN; (C) ANY INTERRUPTION OR CESSATION OF TRANSMISSION
              TO OR FROM THE SITE; OR (D) ANY CONTENT OR CONDUCT OF ANY THIRD PARTY ON THE SITE.
              IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS EXCEED ONE HUNDRED U.S.
              DOLLARS ($100.00).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-[300] text-[#0a0a0a] mb-4">11. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Perfect Sense Productions and its
              owner(s), officers, employees, and agents from and against any and all claims,
              liabilities, damages, losses, costs, and expenses (including reasonable attorneys&apos;
              fees) arising out of or relating to: (a) your use of the Site; (b) your violation of
              these Terms of Use; (c) your violation of any rights of any third party; or (d) any
              content you submit or transmit through the Site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-[300] text-[#0a0a0a] mb-4">12. Dispute Resolution and Mandatory Arbitration</h2>
            <p className="mb-4">
              <strong className="font-[400] text-[#0a0a0a]">PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS, INCLUDING YOUR RIGHT TO FILE A LAWSUIT IN COURT.</strong>
            </p>
            <p className="mb-4">
              <strong className="font-[400] text-[#0a0a0a]">Agreement to Arbitrate.</strong>{" "}
              You and Perfect Sense Productions agree that any dispute, claim, or controversy arising
              out of or relating to these Terms of Use or the use of the Site (collectively,
              &quot;Disputes&quot;) shall be resolved exclusively through final and binding arbitration,
              rather than in court, except that either party may bring an individual action in small
              claims court if the claim qualifies.
            </p>
            <p className="mb-4">
              <strong className="font-[400] text-[#0a0a0a]">Arbitration Rules.</strong>{" "}
              Arbitration shall be conducted by the American Arbitration Association (&quot;AAA&quot;) under
              its Consumer Arbitration Rules then in effect, which are available at{" "}
              <span className="text-[#0a0a0a]">www.adr.org</span>. The arbitration shall be conducted
              by a single arbitrator. The arbitration shall be held in New York, New York, or at
              another mutually agreed upon location. The arbitrator&apos;s decision shall be final and
              binding and may be entered as a judgment in any court of competent jurisdiction.
            </p>
            <p className="mb-4">
              <strong className="font-[400] text-[#0a0a0a]">Class Action Waiver.</strong>{" "}
              YOU AND PERFECT SENSE PRODUCTIONS AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER
              ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY
              PURPORTED CLASS, CONSOLIDATED, OR REPRESENTATIVE ACTION. Unless both you and Perfect
              Sense Productions agree otherwise, the arbitrator may not consolidate more than one
              person&apos;s claims and may not otherwise preside over any form of a representative or
              class proceeding.
            </p>
            <p>
              <strong className="font-[400] text-[#0a0a0a]">Opt-Out.</strong>{" "}
              You may opt out of this arbitration agreement by sending written notice to{" "}
              <a href="mailto:hello@perfectsenseproductions.com" className="text-[#0a0a0a] underline">
                hello@perfectsenseproductions.com
              </a>{" "}
              within 30 days of first accepting these Terms of Use. Your notice must include your
              name, address, and a clear statement that you wish to opt out of this arbitration
              agreement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-[300] text-[#0a0a0a] mb-4">13. Governing Law</h2>
            <p>
              These Terms of Use and any Disputes shall be governed by and construed in accordance
              with the laws of the State of New York, without regard to its conflict of law provisions.
              To the extent that litigation is permitted under these Terms, you consent to the
              exclusive jurisdiction of the state and federal courts located in New York County,
              New York.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-[300] text-[#0a0a0a] mb-4">14. Severability</h2>
            <p>
              If any provision of these Terms of Use is held to be invalid, illegal, or unenforceable,
              the remaining provisions shall continue in full force and effect. The invalid or
              unenforceable provision shall be modified to the minimum extent necessary to make it
              valid and enforceable.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-[300] text-[#0a0a0a] mb-4">15. Entire Agreement</h2>
            <p>
              These Terms of Use, together with our{" "}
              <a href="/privacy" className="text-[#0a0a0a] underline">Privacy Policy</a>,
              constitute the entire agreement between you and Perfect Sense Productions with
              respect to the Site and supersede all prior or contemporaneous communications
              and proposals, whether oral or written.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-[300] text-[#0a0a0a] mb-4">16. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Use at any time. Changes will be effective
              immediately upon posting on this page with an updated &quot;Last updated&quot; date. Your continued
              use of the Site after any changes constitutes your acceptance of the revised terms. We
              encourage you to review these Terms periodically.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-[300] text-[#0a0a0a] mb-4">17. Contact Us</h2>
            <p>
              If you have questions about these Terms of Use, please contact us at:{" "}
              <a href="mailto:hello@perfectsenseproductions.com" className="text-[#0a0a0a] underline">
                hello@perfectsenseproductions.com
              </a>
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
