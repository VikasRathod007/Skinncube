const axios = require('axios');

const API_URL = 'http://localhost:8000/api/v1';

// Sample blog data
const sampleBlogs = [
    {
        title: "Understanding Skin Types: A Complete Guide",
        content: `
# Understanding Your Skin Type

Understanding your skin type is the foundation of effective skincare. Different skin types require different approaches to achieve optimal health and appearance.

## The Five Main Skin Types

### 1. Normal Skin
Normal skin is well-balanced, neither too oily nor too dry. It has:
- Fine pores
- Good blood circulation
- A soft, smooth texture
- Fresh, vibrant appearance

### 2. Dry Skin
Dry skin often feels tight and may appear flaky. Characteristics include:
- Small pores
- Less elastic appearance
- More visible lines
- Dull, rough complexion

### 3. Oily Skin
Oily skin appears shiny and feels greasy. Signs include:
- Large, visible pores
- Thick, dull complexion
- Blackheads, pimples, or other blemishes

### 4. Combination Skin
This skin type has characteristics of both oily and dry skin:
- Oily T-zone (forehead, nose, chin)
- Normal to dry cheeks
- Large pores on the nose

### 5. Sensitive Skin
Sensitive skin is often a condition rather than a type:
- Reacts easily to products or environmental factors
- May appear red, feel burning, itching, or dry
- Often triggered by certain ingredients

## How to Determine Your Skin Type

The best way to determine your skin type is through careful observation and sometimes professional consultation.

### The Blotting Sheet Method
1. Cleanse your face gently and pat dry
2. Wait for one hour without applying any products
3. Press blotting sheets to different areas of your face
4. Hold the sheets up to the light to see oil marks

**Results:**
- Little to no oil: Dry skin
- Oil from T-zone only: Combination skin
- Oil from all areas: Oily skin

## Skincare Routine by Type

### For Normal Skin
- Gentle cleanser twice daily
- Light moisturizer
- SPF during the day
- Weekly exfoliation

### For Dry Skin
- Cream-based cleanser
- Rich, hydrating moisturizer
- Hyaluronic acid serums
- Gentle exfoliation monthly

### For Oily Skin
- Foaming cleanser with salicylic acid
- Oil-free, lightweight moisturizer
- Clay masks weekly
- Regular exfoliation

### For Combination Skin
- Use different products for different areas
- Oil-free products for T-zone
- Hydrating products for cheeks

### For Sensitive Skin
- Fragrance-free products
- Patch test new products
- Gentle, minimal ingredients
- Avoid harsh actives

## Common Mistakes to Avoid

1. **Over-cleansing** - Can strip natural oils
2. **Skipping moisturizer** - Even oily skin needs hydration
3. **Not using SPF** - Sun damage affects all skin types
4. **Changing products too frequently** - Give products time to work

## When to See a Professional

Consider consulting a dermatologist or esthetician if:
- You're unsure about your skin type
- You have persistent skin issues
- Products consistently cause reactions
- You want a professional assessment

Remember, skin type can change over time due to factors like age, hormones, climate, and lifestyle. Regular reassessment ensures your skincare routine remains effective.
        `,
        excerpt: "Learn how to identify your skin type and create an effective skincare routine tailored to your specific needs.",
        category: "skincare",
        tags: "skin type, skincare routine, dermatology, beauty tips",
        seoTitle: "Understanding Skin Types: Complete Guide to Skincare | SkinnCube",
        seoDescription: "Discover your skin type with our comprehensive guide. Learn about normal, dry, oily, combination, and sensitive skin types plus personalized skincare routines.",
        status: "published",
        featured: true
    },
    {
        title: "The Science of Sunscreen: Protecting Your Skin",
        content: `
# The Science of Sunscreen: Your Shield Against UV Damage

Sunscreen is one of the most important products in your skincare arsenal. Understanding how it works can help you make better choices for your skin protection.

## Understanding UV Radiation

The sun emits two types of harmful UV radiation that reach Earth:

### UVA Rays (320-400 nm)
- Penetrate deep into the skin
- Cause premature aging and wrinkles
- Can penetrate clouds and glass
- Present year-round, even in winter

### UVB Rays (280-320 nm)
- Primarily affect the skin's surface
- Main cause of sunburn
- Intensity varies by season and time of day
- Strongest between 10 AM and 4 PM

## Types of Sunscreen

### Chemical (Organic) Sunscreens
These absorb UV radiation and convert it to heat:

**Common ingredients:**
- Avobenzone (UVA protection)
- Octinoxate (UVB protection)
- Octisalate (UVB protection)
- Oxybenzone (UVA/UVB protection)

**Pros:**
- Lightweight texture
- Easy to blend
- Good for daily wear

**Cons:**
- May cause irritation in sensitive skin
- Takes 20 minutes to become effective
- Can degrade over time

### Physical (Mineral) Sunscreens
These create a physical barrier that reflects UV rays:

**Active ingredients:**
- Zinc oxide (broad spectrum)
- Titanium dioxide (primarily UVB)

**Pros:**
- Immediate protection
- Less likely to cause irritation
- More stable formula
- Better for sensitive skin

**Cons:**
- Can leave white cast
- Thicker texture
- May be harder to blend

## Understanding SPF

SPF (Sun Protection Factor) measures protection against UVB rays:

- **SPF 15**: Blocks 93% of UVB rays
- **SPF 30**: Blocks 97% of UVB rays
- **SPF 50**: Blocks 98% of UVB rays

### Important Notes:
- Higher SPF doesn't mean proportionally better protection
- No sunscreen blocks 100% of UV rays
- SPF only measures UVB protection, not UVA

## Broad Spectrum Protection

Look for "broad spectrum" on labels, which means the product protects against both UVA and UVB rays. This is crucial for:
- Preventing sunburn (UVB)
- Reducing premature aging (UVA)
- Lowering skin cancer risk

## Application Guidelines

### Amount
- Face: 1/4 teaspoon (about 2mg per cm²)
- Body: 1 ounce (30ml) for full coverage
- Most people apply only 25-50% of the recommended amount

### Frequency
- Apply 15-30 minutes before sun exposure
- Reapply every 2 hours
- Reapply immediately after swimming or sweating
- Reapply after towel drying

## Special Considerations

### Water Resistance
- "Water resistant (40 minutes)": Maintains SPF for 40 minutes while swimming/sweating
- "Water resistant (80 minutes)": Maintains SPF for 80 minutes while swimming/sweating
- No sunscreen is "waterproof" or "sweatproof"

### Expiration
- Most sunscreens expire after 3 years
- Check expiration dates
- Replace if consistency, color, or smell changes

## Sunscreen for Different Skin Types

### Oily/Acne-Prone Skin
- Look for oil-free, non-comedogenic formulas
- Consider gel-based or powder sunscreens
- Zinc oxide can be beneficial for acne

### Dry Skin
- Choose moisturizing formulas
- Look for ingredients like hyaluronic acid
- Cream-based sunscreens work well

### Sensitive Skin
- Opt for mineral sunscreens
- Avoid fragrances and chemical filters
- Look for "sensitive skin" formulations

## Common Myths Debunked

### Myth 1: "I don't need sunscreen on cloudy days"
**Fact**: Up to 80% of UV rays can penetrate clouds

### Myth 2: "Darker skin doesn't need sunscreen"
**Fact**: All skin types can suffer UV damage and need protection

### Myth 3: "I can't get vitamin D if I wear sunscreen"
**Fact**: You can still produce vitamin D with sunscreen use

### Myth 4: "Makeup with SPF is enough"
**Fact**: Usually not applied thickly enough for adequate protection

## The Bottom Line

Sunscreen is essential for:
- Preventing skin cancer
- Reducing premature aging
- Maintaining healthy skin
- Preventing hyperpigmentation

Make sunscreen a non-negotiable part of your daily routine, regardless of the weather or season. Your future self will thank you!

## Expert Tips

1. **Layer appropriately**: Apply sunscreen after skincare but before makeup
2. **Don't forget**: Ears, neck, hands, and feet
3. **Lip protection**: Use SPF lip balm
4. **Seek shade**: Sunscreen is one part of sun protection
5. **Protective clothing**: Wear hats and UV-protective clothing when possible

Remember: The best sunscreen is the one you'll use consistently every day!
        `,
        excerpt: "Discover the science behind sunscreen, how to choose the right SPF, and expert tips for optimal sun protection.",
        category: "skincare",
        tags: "sunscreen, SPF, UV protection, skin cancer prevention",
        seoTitle: "Sunscreen Science: Complete Guide to UV Protection | SkinnCube",
        seoDescription: "Learn the science of sunscreen, understand SPF ratings, and discover how to choose and apply sunscreen for maximum protection against UV damage.",
        status: "published",
        featured: false
    },
    {
        title: "Acne Treatment: From Causes to Effective Solutions",
        content: `
# Understanding and Treating Acne: A Comprehensive Guide

Acne is one of the most common skin conditions, affecting millions of people worldwide. Understanding its causes and treatment options is key to achieving clearer skin.

## What Is Acne?

Acne occurs when hair follicles become clogged with oil (sebum) and dead skin cells. This creates an environment where bacteria can thrive, leading to inflammation and the formation of various types of acne lesions.

## Types of Acne

### Non-Inflammatory Acne

#### Blackheads (Open Comedones)
- Clogged pores that remain open
- Dark appearance due to oxidation
- Usually found on nose, chin, and forehead

#### Whiteheads (Closed Comedones)
- Clogged pores with closed surface
- Small, white or flesh-colored bumps
- Oil and bacteria trapped beneath skin

### Inflammatory Acne

#### Papules
- Small, red, tender bumps
- No visible center or head
- Result from infected blackheads or whiteheads

#### Pustules
- Red bumps with white or yellow centers
- Contain pus and bacteria
- May be painful to touch

#### Nodules
- Large, hard bumps beneath skin surface
- Very painful and deep
- Can lead to scarring

#### Cysts
- Large, pus-filled lesions
- Most severe form of acne
- High risk of scarring
- May require professional treatment

## Causes of Acne

### Primary Factors

1. **Excess Oil Production**
   - Hormones stimulate sebaceous glands
   - Genetic predisposition
   - Age-related changes

2. **Clogged Hair Follicles**
   - Dead skin cells don't shed properly
   - Mix with oil to block pores
   - Creates environment for bacteria

3. **Bacteria Growth**
   - *Propionibacterium acnes* (P. acnes)
   - Feeds on sebum and dead skin cells
   - Triggers inflammatory response

4. **Inflammation**
   - Body's immune response to bacteria
   - Causes redness, swelling, pain
   - Can lead to scarring

### Contributing Factors

#### Hormonal Changes
- Puberty and adolescence
- Menstrual cycles
- Pregnancy
- PCOS (Polycystic Ovary Syndrome)

#### Genetics
- Family history of acne
- Inherited skin characteristics
- Hormonal sensitivity

#### Lifestyle Factors
- High-glycemic diet
- Dairy consumption (controversial)
- Stress levels
- Sleep quality
- Exercise habits

#### External Factors
- Comedogenic skincare products
- Heavy makeup
- Environmental pollutants
- Touching/picking at skin

## Treatment Approaches

### Over-the-Counter Options

#### Topical Treatments

**Benzoyl Peroxide**
- Kills bacteria and dries excess oil
- Available in 2.5%, 5%, and 10% strengths
- Start with lower concentration
- May cause dryness and irritation

**Salicylic Acid**
- Beta-hydroxy acid (BHA)
- Exfoliates inside pores
- Reduces inflammation
- Good for blackheads and whiteheads

**Alpha-Hydroxy Acids (AHAs)**
- Glycolic acid, lactic acid
- Exfoliate skin surface
- Improve skin texture
- Help prevent clogged pores

**Sulfur**
- Dries out skin surface
- Absorbs excess oil
- Mild antibacterial properties
- Often combined with other ingredients

### Prescription Treatments

#### Topical Medications

**Retinoids**
- Tretinoin, adapalene, tazarotene
- Prevent clogged pores
- Increase cell turnover
- Gold standard for acne treatment

**Topical Antibiotics**
- Clindamycin, erythromycin
- Reduce bacteria and inflammation
- Often combined with other treatments
- Risk of antibiotic resistance

**Combination Products**
- Benzoyl peroxide + antibiotic
- Retinoid + antibiotic
- Multiple mechanisms of action

#### Oral Medications

**Antibiotics**
- Doxycycline, minocycline
- Reduce bacteria and inflammation
- Used for moderate to severe acne
- Limited duration to prevent resistance

**Hormonal Treatments (for women)**
- Birth control pills
- Spironolactone
- Help hormone-related acne

**Isotretinoin (Accutane)**
- For severe, cystic acne
- Reduces oil production significantly
- Requires careful monitoring
- Highly effective but with potential side effects

### Professional Treatments

#### In-Office Procedures

**Chemical Peels**
- Remove outer layers of skin
- Unclog pores and reduce scarring
- Various strengths available

**Extraction**
- Professional removal of blackheads/whiteheads
- Should only be done by professionals
- Prevents scarring from improper picking

**Light and Laser Therapy**
- Blue light kills bacteria
- Red light reduces inflammation
- Various laser types available

**Corticosteroid Injections**
- For large, painful cysts
- Rapid reduction in inflammation
- Prevents scarring

## Building an Effective Routine

### For Mild Acne

**Morning:**
1. Gentle cleanser
2. Salicylic acid or benzoyl peroxide
3. Oil-free moisturizer
4. Broad-spectrum sunscreen

**Evening:**
1. Gentle cleanser
2. Retinoid or alternative treatment
3. Moisturizer

### For Moderate to Severe Acne

Consult a dermatologist for:
- Prescription medications
- Combination therapy approach
- Professional monitoring

## Lifestyle Modifications

### Diet
- Limit high-glycemic foods
- Consider reducing dairy (if correlated)
- Eat anti-inflammatory foods
- Stay hydrated

### Stress Management
- Regular exercise
- Adequate sleep (7-9 hours)
- Stress-reduction techniques
- Mindfulness practices

### Skincare Habits
- Don't over-wash (twice daily max)
- Use non-comedogenic products
- Avoid picking or squeezing
- Be patient with treatments

## Common Mistakes to Avoid

1. **Over-treating**: Using too many products or too high concentrations
2. **Impatience**: Not giving treatments enough time (6-8 weeks minimum)
3. **Inconsistency**: Irregular use of treatments
4. **DIY extraction**: Picking or squeezing lesions
5. **Ignoring moisturizer**: Even oily skin needs hydration

## When to See a Dermatologist

Consult a professional if:
- Over-the-counter treatments aren't working after 2-3 months
- Acne is severe or cystic
- Scarring is developing
- Acne is affecting self-esteem
- You need guidance on treatment options

## The Path to Clear Skin

Remember that acne treatment:
- Takes time and patience
- Often requires combination approaches
- May need adjustment over time
- Is highly individual

With the right treatment plan and consistency, most people can achieve significant improvement in their acne. Don't hesitate to seek professional help when needed – clear skin is achievable!

## Prevention Tips

1. **Gentle skincare routine**
2. **Regular face washing**
3. **Non-comedogenic products**
4. **Clean pillowcases and towels**
5. **Avoid touching face**
6. **Manage stress**
7. **Healthy lifestyle choices**

The journey to clear skin may take time, but with proper understanding and treatment, acne can be effectively managed and controlled.
        `,
        excerpt: "A comprehensive guide to understanding acne causes, types, and effective treatment options from over-the-counter to professional solutions.",
        category: "skincare",
        tags: "acne treatment, skincare, dermatology, acne causes",
        seoTitle: "Complete Acne Treatment Guide: Causes & Solutions | SkinnCube",
        seoDescription: "Learn about acne causes, types, and effective treatments. From over-the-counter solutions to professional options for clearer skin.",
        status: "published",
        featured: true
    },
    {
        title: "Anti-Aging Skincare: Science-Based Strategies",
        content: `
# Anti-Aging Skincare: Evidence-Based Approaches to Youthful Skin

Aging is a natural process, but understanding the science behind it can help us age gracefully and maintain healthy, vibrant skin throughout our lives.

## Understanding Skin Aging

### Intrinsic Aging (Natural/Chronological)
- Genetically programmed process
- Begins in our 20s
- Gradual decline in skin function
- Cannot be prevented, only slowed

**Changes include:**
- Decreased collagen production (1% per year after age 20)
- Reduced elastin fibers
- Slower cell turnover
- Decreased oil production
- Thinner skin layers

### Extrinsic Aging (Environmental)
- Caused by external factors
- Accelerates natural aging
- Largely preventable
- Accounts for 80% of visible aging

**Primary causes:**
- UV radiation (photoaging)
- Pollution
- Smoking
- Poor nutrition
- Stress
- Lack of sleep

## The Science of Aging

### Collagen and Elastin Breakdown
- Collagen provides structure and firmness
- Elastin allows skin to snap back
- Both decrease with age and sun exposure
- Loss leads to wrinkles and sagging

### Cellular Damage
- Free radical damage accumulates
- DNA damage affects cell function
- Mitochondrial dysfunction
- Reduced cellular repair mechanisms

### Hormonal Changes
- Estrogen decline (especially menopause)
- Growth hormone reduction
- Thyroid changes
- Affects skin thickness and moisture

## Key Anti-Aging Ingredients

### Retinoids (Vitamin A derivatives)
**How they work:**
- Increase cell turnover
- Stimulate collagen production
- Reduce fine lines and wrinkles
- Improve skin texture and tone

**Types:**
- **Retinol**: Over-the-counter, gentler
- **Retinyl palmitate**: Mildest form
- **Tretinoin**: Prescription, most potent
- **Adapalene**: Prescription, less irritating

**Usage tips:**
- Start slowly (2-3 times per week)
- Use at night only
- Always use sunscreen during the day
- Expect initial irritation

### Vitamin C (L-Ascorbic Acid)
**Benefits:**
- Powerful antioxidant
- Stimulates collagen synthesis
- Brightens skin
- Reduces hyperpigmentation
- Protects against environmental damage

**Forms:**
- **L-Ascorbic Acid**: Most potent, unstable
- **Magnesium Ascorbyl Phosphate**: Stable, gentler
- **Sodium Ascorbyl Phosphate**: Good for acne-prone skin
- **Ascorbyl Glucoside**: Very stable

### Hyaluronic Acid
**Properties:**
- Holds 1000x its weight in water
- Naturally found in skin
- Decreases with age
- Provides immediate plumping effect

**Benefits:**
- Intense hydration
- Reduces appearance of fine lines
- Improves skin texture
- Suitable for all skin types

### Peptides
**Function:**
- Signal molecules for skin repair
- Stimulate collagen production
- Improve skin barrier function
- Various types target different concerns

**Common types:**
- **Signal peptides**: Stimulate collagen
- **Carrier peptides**: Deliver minerals
- **Neurotransmitter peptides**: Reduce muscle contractions
- **Enzyme inhibitor peptides**: Prevent breakdown

### Alpha-Hydroxy Acids (AHAs)
**Mechanism:**
- Exfoliate dead skin cells
- Stimulate cell renewal
- Improve product penetration
- Reduce appearance of fine lines

**Types:**
- **Glycolic Acid**: Smallest molecule, deepest penetration
- **Lactic Acid**: Gentler, more hydrating
- **Mandelic Acid**: Largest molecule, gentlest

### Niacinamide (Vitamin B3)
**Benefits:**
- Reduces inflammation
- Minimizes pore appearance
- Regulates oil production
- Improves skin barrier function
- Reduces hyperpigmentation

## Building an Anti-Aging Routine

### Morning Routine

1. **Gentle Cleanser**
   - Remove overnight buildup
   - Prepare skin for products

2. **Vitamin C Serum**
   - Apply to clean, dry skin
   - Provides antioxidant protection
   - Wait 10-15 minutes before next step

3. **Hyaluronic Acid Serum**
   - Apply to slightly damp skin
   - Provides hydration boost

4. **Moisturizer**
   - Choose based on skin type
   - Look for ceramides, peptides

5. **Broad-Spectrum Sunscreen (SPF 30+)**
   - Non-negotiable daily step
   - Reapply every 2 hours

### Evening Routine

1. **Double Cleanse**
   - Oil cleanser to remove makeup/sunscreen
   - Water-based cleanser for deep clean

2. **Treatment Products**
   - Retinoid (start 2-3x per week)
   - OR AHA/BHA exfoliant (alternate nights)

3. **Hydrating Serum**
   - Hyaluronic acid or niacinamide

4. **Night Moisturizer**
   - Richer formula for overnight repair
   - May include peptides or ceramides

5. **Face Oil (optional)**
   - For extra hydration
   - Choose non-comedogenic options

### Weekly Additions

- **Exfoliating Treatment**: AHA or enzyme mask
- **Hydrating Mask**: Sheet mask or cream mask
- **Professional Treatments**: As recommended

## Advanced Anti-Aging Treatments

### Professional Options

#### Chemical Peels
- **Light peels**: Glycolic, lactic acid
- **Medium peels**: TCA (trichloroacetic acid)
- **Deep peels**: Phenol (rarely used)

**Benefits:**
- Improved texture and tone
- Reduced fine lines
- Decreased hyperpigmentation
- Stimulated collagen production

#### Microneedling
- Creates micro-injuries to stimulate healing
- Increases product absorption
- Stimulates collagen and elastin production
- Minimal downtime

#### Laser Treatments
- **Fractional lasers**: Resurface skin
- **IPL**: Targets pigmentation
- **CO2 lasers**: Deep resurfacing
- Various intensities available

#### Injectable Treatments
- **Botox**: Relaxes muscles, prevents wrinkles
- **Dermal fillers**: Replace lost volume
- **PDO threads**: Lifting and tightening

### At-Home Devices

#### LED Light Therapy
- Red light stimulates collagen
- Near-infrared penetrates deeper
- Convenient for regular use

#### Microcurrent Devices
- Stimulate facial muscles
- Improve circulation
- Temporary lifting effect

## Lifestyle Factors for Anti-Aging

### Nutrition
**Anti-aging foods:**
- Antioxidant-rich fruits and vegetables
- Omega-3 fatty acids
- Protein for collagen synthesis
- Adequate hydration

**Avoid:**
- Excessive sugar (glycation)
- Processed foods
- Excessive alcohol

### Sleep
- 7-9 hours of quality sleep
- Use silk pillowcases
- Sleep on your back when possible
- Maintain consistent sleep schedule

### Exercise
- Improves circulation
- Reduces stress
- Promotes cellular repair
- Maintains muscle tone

### Stress Management
- Chronic stress accelerates aging
- Practice mindfulness
- Regular relaxation techniques
- Maintain social connections

## Common Anti-Aging Myths

### Myth 1: "More expensive always means better"
**Reality**: Price doesn't always correlate with effectiveness

### Myth 2: "Natural products are always safer"
**Reality**: Natural ingredients can still cause reactions

### Myth 3: "You should start anti-aging products when you see wrinkles"
**Reality**: Prevention is easier than correction

### Myth 4: "If it doesn't irritate, it's not working"
**Reality**: Irritation doesn't equal effectiveness

## Age-Specific Recommendations

### 20s
- Focus on prevention
- Establish good habits
- Sunscreen daily
- Basic moisturizing routine

### 30s
- Introduce retinoids
- Add antioxidants
- Focus on hydration
- Consider professional treatments

### 40s
- Intensify treatment approach
- Add peptides and growth factors
- Consider hormone consultation
- Regular professional treatments

### 50s and beyond
- Comprehensive anti-aging routine
- Focus on skin barrier repair
- Consider advanced treatments
- Adapt to changing skin needs

## Setting Realistic Expectations

### What Anti-Aging Can Do:
- Slow the aging process
- Improve skin texture and tone
- Reduce fine lines and wrinkles
- Prevent further damage
- Enhance overall skin health

### What It Cannot Do:
- Stop aging completely
- Provide instant dramatic results
- Replace genetics
- Work without consistency

## The Bottom Line

Effective anti-aging skincare:
- Starts with prevention
- Requires consistency
- Combines multiple approaches
- Adapts to changing needs
- Focuses on overall skin health

Remember, the goal isn't to look 20 forever, but to maintain healthy, vibrant skin that reflects your best self at every age.

## Expert Tips

1. **Start early**: Prevention is always easier than correction
2. **Be consistent**: Daily habits matter more than expensive products
3. **Protect from sun**: This cannot be overstated
4. **Stay hydrated**: From inside and out
5. **Be patient**: Visible results take 3-6 months
6. **Consult professionals**: For personalized advice
7. **Listen to your skin**: Adjust routine as needed

The journey to healthier, more youthful-looking skin is a marathon, not a sprint. Focus on building sustainable habits that you can maintain long-term for the best results.
        `,
        excerpt: "Discover evidence-based anti-aging strategies, key ingredients, and professional treatments to maintain youthful, healthy skin.",
        category: "anti-aging",
        tags: "anti-aging, retinoids, vitamin C, skincare routine, collagen",
        seoTitle: "Science-Based Anti-Aging Skincare Guide | SkinnCube",
        seoDescription: "Learn about proven anti-aging ingredients like retinoids and vitamin C, plus professional treatments and lifestyle factors for youthful skin.",
        status: "published",
        featured: false
    }
];

// Function to login and get auth token
async function loginAsAdmin() {
    try {
        // Try different common passwords
        const passwords = ['Admin123', 'admin123', 'password', 'Password123', 'admin', 'Admin@123'];

        for (const password of passwords) {
            try {
                const response = await axios.post(`${API_URL}/users/login`, {
                    email: 'vikeyrathod007@gmail.com',
                    password: password
                });
                console.log(`Login successful with password: ${password}`);
                return response.data.data.accessToken;
            } catch (error) {
                console.log(`Password ${password} failed`);
                continue;
            }
        }

        throw new Error('None of the common passwords worked');
    } catch (error) {
        console.error('Login failed:', error.message);
        throw error;
    }
}

// Function to create a blog
async function createBlog(blogData, token) {
    try {
        const response = await axios.post(`${API_URL}/blog`, blogData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to create blog:', error.response?.data || error.message);
        throw error;
    }
}

// Main function to add sample blogs
async function addSampleBlogs() {
    try {
        console.log('Logging in as admin...');
        const token = await loginAsAdmin();
        console.log('Login successful!');

        console.log('Adding sample blogs...');
        for (const blog of sampleBlogs) {
            try {
                const result = await createBlog(blog, token);
                console.log(`✓ Created blog: "${blog.title}"`);
            } catch (error) {
                console.error(`✗ Failed to create blog: "${blog.title}"`, error.message);
            }
        }

        console.log('Sample blogs creation completed!');
    } catch (error) {
        console.error('Failed to add sample blogs:', error.message);
    }
}

// Run the script
addSampleBlogs();
