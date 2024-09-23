/// <reference types="cypress"/>

describe('Visit Website', () => {
    it('Should visit the staging website and select random options from three dropdowns', () => {

        Cypress._.times(1, () => {
            cy.clearCookies();
            cy.clearLocalStorage();
        cy.visit('https://staging.survey.culture15.com/survey/diagnose/Sep24/66f1631be7c6e34358df196f');
        cy.wait(1000)

        cy.get('.py-1', { timeout: 10000 }).click({force: true});
        cy.get('.bg-PRIMARY', { timeout: 10000 }).click();
        cy.get('.bg-PRIMARY', { timeout: 10000 }).click();
        cy.get('.bg-PRIMARY', { timeout: 10000 }).click();

        cy.wait(2000);

         // First dropdown
         cy.get('.relative').eq(3).click();
         cy.wait(1000)
         cy.get('div[role="listbox"]', { timeout: 10000 }).eq(0)
         .find('div')
         .should('have.length.greaterThan', 0)
         .then($options => {
           const randomIndex = Cypress._.random($options.length - 1);
           cy.wrap($options.eq(randomIndex)).click({ force: true });
         });

         // 2nd Dropdown
         cy.get('.relative').eq(6).click();
         cy.wait(1000)
         cy.get('div[role="listbox"]', { timeout: 10000 }).eq(1)
           .find('div')
           .should('have.length.greaterThan', 0)
           .then($options => {
             const randomIndex = Cypress._.random($options.length - 1);
             cy.wrap($options.eq(randomIndex)).click({ force: true });
           });

         // 3rd Dropdown
         cy.get('.relative').eq(9).click();
         cy.get('div[role="listbox"]', { timeout: 10000 }).eq(2)
           .find('div')
           .should('have.length.greaterThan', 0)
           .then($options => {
             const randomIndex = Cypress._.random($options.length - 1);
             cy.wrap($options.eq(randomIndex)).click({ force: true });
           });
        
        // Interact with text field and submit button
        cy.get('.font-bold').eq(3, { timeout: 10000 }).click();
        cy.get('.z-20', { timeout: 10000 }).type('Ich fördere Harmonie, indem ich Konflikte vermeide. Mir ist es wichtig, ein friedliches Umfeld zu schaffen, in dem sich jeder wohlfühlt. Daher suche ich nach Gemeinsamkeiten und vermeide Eskalationen.');
        cy.get('.font-bold').eq(3, { timeout: 10000 }).click();
        cy.get('.z-20', { timeout: 10000 }).type('Je travaille de manière collective. Les succès sont célébrés en équipe, car les réalisations communes priment. La collaboration est essentielle au succès, plutôt que la reconnaissance individuelle.')
        cy.get('.font-bold').eq(3, { timeout: 10000 }).click();
        cy.get('.z-20', { timeout: 10000 }).type('Valorizo a responsabilidade e dou autonomia às pessoas. Elas são incentivadas a tomar a iniciativa e a decidir de forma independente, em vez de esperar por orientações. Isso promove crescimento.')
        cy.get('.font-bold').eq(3, { timeout: 10000 }).click();
        cy.get('.z-20', { timeout: 10000 }).type('Jeg foretrekker at beslutninger tas distribuert i organisasjonen, slik at alle nivåer kan bidra, i stedet for en sentralisert hierarki.')
        cy.get('.font-bold').eq(3, { timeout: 10000 }).click();
        cy.get('.z-20', { timeout: 10000 }).type('Pidän päätöksenteosta nopeana. Teemme päätöksiä nopeasti ja tehokkaasti, keskittyen selkeisiin tuloksiin sen sijaan, että käytämme aikaa pitkään keskusteluun tai analysointiin.')
        cy.get('.font-bold').eq(3, { timeout: 10000 }).click();
        cy.get('.z-20', { timeout: 10000 }).type(' Preferisco cercare un consenso all, interno del team. Affronto i dissensi cercando di trovare un accordo tra tutti, piuttosto che focalizzarmi solo sul risultato.')
        cy.get('.font-bold').eq(3, { timeout: 10000 }).click();
        cy.get('.z-20', { timeout: 10000 }).type('Priorizo los hechos sobre las personas al resolver problemas. Enfocarse en datos garantiza decisiones claras, aunque también valoro las perspectivas de las personas.')
        cy.get('.font-bold').eq(3, { timeout: 10000 }).click();
        cy.get('.z-20', { timeout: 10000 }).type('Jag fokuserar på lärande. Jag söker efter nya idéer och innovativa metoder för att förbättra, istället för att strikt följa befintliga metoder och enbart lita på experter.')
        cy.get('.font-bold').eq(3, { timeout: 10000 }).click();
        cy.get('.z-20', { timeout: 10000 }).type('Preferuję szybkie rozpoczęcie zadań i dostosowywanie ich w miarę potrzeby. Elastyczność pozwala na szybszy postęp i dostosowanie, zamiast czekać na dokładny plan.')
        cy.get('.font-bold').eq(3, { timeout: 10000 }).click();
        cy.get('.z-20', { timeout: 10000 }).type('Ambitliyim ve zorlu hedeflerin peşinden giderim. Riskleri ve belirsizlikleri büyüme fırsatları olarak görürüm, aşırı temkinli olmaktansa veya risklerden kaçınmaktansa.')
        cy.get('.font-bold').eq(3, { timeout: 10000 }).click();
        cy.get('.z-20', { timeout: 10000 }).type('Організація шукає інформацію та натхнення ззовні. Ми зосереджуємося на зборі зовнішніх ідей для стимулювання інновацій та покращень, а не лише на наших продуктах чи послугах.')
        cy.get('.font-bold').eq(3, { timeout: 10000 }).click();
        cy.get('.z-20', { timeout: 10000 }).type(' 可以做自己并享受乐趣。我们鼓励个性和轻松的氛围，而不是严格遵守形式和刻板的规范。可以做自己并享受乐趣。我们鼓励个性和轻松的氛围，而不是严格遵守形式和刻板的规范可以做自己并享受乐趣。我们鼓励个性和轻松的氛围，而不是严格遵守形式和刻板的规范')
        cy.get('.font-bold').eq(3, { timeout: 10000 }).click();
        cy.get('.z-20', { timeout: 10000 }).type('nformation deles åbent. Vi prioriterer gennemsigtighed og sikrer, at relevante detaljer er tilgængelige for alle, i stedet for at begrænse dem til kun dem, der har brug for at vide det.')
        cy.get('.font-bold').eq(3, { timeout: 10000 }).click();
        cy.get('.z-20', { timeout: 10000 }).type('Suhtlus on interaktiivne. Meil on palju võimalusi anda ja saada tagasisidet, edendades kahepoolset suhtlust, mitte ainult ühepoolset suhtlemist.')
        cy.get('.font-bold').eq(3, { timeout: 10000 }).click();
        cy.get('.z-20', { timeout: 10000 }).type(' 情報は明確に定義されたプロセスとシステムによって整理・共有されています。非公式な共有も行われますが、体系的な方法が一貫性と効率を確保します。 情報は明確に定義されたプロセスとシステムによって整理・共有されています.  情報は明確に定義されたプロセスとシステムによって整理・共有されています')
        cy.get('.font-bold').eq(3, { timeout: 10000 }).click();
        cy.get('.z-20', { timeout: 10000 }).type('Kultura je v mé obchodní oblasti špatná.Kultura je v mé obchodní oblasti špatná.Kultura je v mé obchodní oblasti špatná.Kultura je v mé obchodní oblasti špatná.')
        cy.get('.font-bold').eq(3, { timeout: 10000 }).click();
        cy.get('.p-4 > .flex-col > .flex > :nth-child(2)').click()
        cy.get('.z-20', { timeout: 10000 }).type('Так, я вважаю, що для успіху нашого напрямку культура повинна змінитися. Позитивна та підтримуюча культура є ключовою для довгострокового успіху та зростання.')
        cy.get('.font-bold').eq(4, { timeout: 10000 }).click();
        cy.get('button[type="button"]').eq(31).click({ force: true })
        cy.get('.font-bold').eq(3, { timeout: 10000 }).click();

        cy.setSliderValue(3);
        cy.get('.font-bold').eq(5, { timeout: 10000 }).click();

        cy.setSliderValue(3);
        cy.get('.font-bold').eq(5, { timeout: 10000 }).click();

        cy.setSliderValue(3);
        cy.get('.font-bold').eq(5, { timeout: 10000 }).click();

        cy.setSliderValue(3);
        cy.get('.font-bold').eq(5, { timeout: 10000 }).click();
        cy.get('.bg-PRIMARY').click()
        cy.wait(8000)
    })

})
})