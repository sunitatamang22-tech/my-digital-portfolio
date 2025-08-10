import { db, blogPosts } from "@/lib/db"; // Import blogPosts table
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { BlogPost } from "@/lib/types"; // Import BlogPost type from lib/types
import { formatDate } from "@/lib/utils"; // Assuming formatDate is in utils

export default async function BlogPage() {
  // Use the imported BlogPost type
  const posts: BlogPost[] = await db.select().from(blogPosts).orderBy(blogPosts.createdAt);

  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Cybersecurity Blog</h1>
              <p className="max-w-[700px] text-gray-400 md:text-xl/relaxed">
                The Rising Tide of Cyber Threats: Why Cybersecurity Matters More Than Ever
In today’s hyperconnected world, our personal and professional lives are more intertwined with technology than ever before. From online banking and shopping to remote work and digital healthcare, the internet powers almost every aspect of modern life. But with this convenience comes an escalating wave of cyber threats that can disrupt businesses, drain finances, and compromise privacy.

The Evolving Cyber Threat Landscape
Cybercriminals are no longer lone hackers in basements. Modern attacks are often carried out by organized crime syndicates, state-sponsored groups, and sophisticated threat actors with deep resources. Common threats include:

Phishing Scams – Deceptive emails or messages designed to steal sensitive information.

Ransomware – Malicious software that encrypts files and demands payment for their release.

Data Breaches – Unauthorized access to confidential data, often leading to identity theft or corporate espionage.

Social Engineering – Psychological manipulation to trick users into revealing secrets or bypassing security controls.

Why Cybersecurity Should Be a Priority
The cost of cybercrime is projected to reach $10.5 trillion annually by 2025. For businesses, a single breach can mean not only financial loss but also reputational damage that takes years to repair. For individuals, stolen credentials can result in drained bank accounts, fraudulent loans, and long-term identity theft issues.

Essential Cybersecurity Practices
Whether you’re an individual or a business, these best practices can significantly reduce your risk:

Enable Multi-Factor Authentication (MFA) – Adds an extra layer of protection beyond passwords.

Regularly Update Software – Security patches fix vulnerabilities before hackers can exploit them.

Use Strong, Unique Passwords – Avoid reusing passwords across different accounts.

Back Up Data Frequently – Ensure backups are encrypted and stored offline.

Educate Yourself and Your Team – Awareness is your first line of defense.

The Human Factor
Interestingly, over 80% of breaches involve human error—clicking malicious links, using weak passwords, or mishandling sensitive data. Building a culture of cybersecurity awareness is as crucial as deploying advanced security tools.

Final Thoughts
Cybersecurity is not a one-time fix—it’s an ongoing process. Threats evolve daily, and so must our defenses. By staying informed, practicing good cyber hygiene, and adopting proactive security measures, we can protect what matters most in our digital lives.

Remember: In the cyber world, prevention is always better (and cheaper) than a cure
              </p>
            </div>
          </div>
        </div>
        {/* Animated background */}
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px] opacity-10"></div>
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => ( // Type is inferred correctly now
              <Card key={post.id} className="overflow-hidden">
                {post.coverImage && ( // Use coverImage instead of imageUrl
                  <Link href={`/blog/${post.slug}`}>
                    <Image
                      src={post.coverImage} // Use coverImage
                      alt={post.title}
                      width={400}
                      height={225}
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                )}
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  {/* Excerpt is not nullable in the schema, so no need for null check */}
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  {/* Ensure formatDate handles Date | null if createdAt can be null */}
                  <p className="text-sm text-muted-foreground">{post.createdAt ? formatDate(post.createdAt) : 'Date unavailable'}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
