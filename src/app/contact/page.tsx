'use client'

import { useEffect, useState } from 'react'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { getPersonalInfo, getSocialLinks } from '@/lib/firebase/firestore'
import { PersonalInfo, SocialLink } from '@/types/admin'
import { animateOnScroll } from '@/lib/three/animations'
import { Mail, ExternalLink } from 'lucide-react'

export default function ContactPage() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null)
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const [info, links] = await Promise.all([
          getPersonalInfo(),
          getSocialLinks(),
        ])
        setPersonalInfo(info)
        setSocialLinks(links)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    animateOnScroll('.contact-section', { y: 50, opacity: 0, duration: 0.8 }).catch(console.error)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // Here you would typically send the form data to an API
    // For now, we'll just simulate a submission
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
    }, 1000)
  }

  return (
    <div className="pt-32 pb-20">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 mb-12">
            Have a project in mind? Let&apos;s discuss how I can help bring your vision to life.
          </p>

          <div className="contact-section grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              {submitted ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                  <p className="text-green-800 font-medium">
                    Thank you! Your message has been sent. I&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <Input
                    label="Email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <Button type="submit" disabled={submitting} size="lg" className="w-full">
                    {submitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                {personalInfo?.email && (
                  <div>
                    <div className="flex items-center mb-2">
                      <Mail size={20} className="mr-2 text-gray-600" />
                      <span className="font-medium">Email</span>
                    </div>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-gray-600 hover:text-black transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                    {personalInfo.responseTime && (
                      <p className="text-sm text-gray-500 mt-1">
                        {personalInfo.responseTime}
                      </p>
                    )}
                  </div>
                )}

                {socialLinks.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-4">Social Links</h3>
                    <div className="space-y-3">
                      {socialLinks.map((link) => (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-600 hover:text-black transition-colors"
                        >
                          {link.icon && <span className="mr-2">{link.icon}</span>}
                          <span>{link.displayName || link.platform}</span>
                          <ExternalLink size={16} className="ml-2" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

