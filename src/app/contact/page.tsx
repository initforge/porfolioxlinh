'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import MainLayout from '@/components/layout/MainLayout'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { getPersonalInfo, getSocialLinks } from '@/lib/firebase/firestore'
import { PersonalInfo, SocialLink } from '@/types/admin'
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
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-black">
          Hãy Tạo Điều Gì Đó Tuyệt Vời
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
          Có dự án trong đầu? Hãy thảo luận về cách tôi có thể giúp biến ý tưởng của bạn thành hiện thực.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Contact Form */}
        <div className="bg-white border-2 border-black rounded-xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">Gửi tin nhắn</h2>
              {submitted ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                  <p className="text-green-800 font-medium text-lg">
                    Cảm ơn bạn! Tin nhắn của bạn đã được gửi. Tôi sẽ phản hồi sớm nhất có thể.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Tên"
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
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Tin nhắn
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={submitting} 
                    size="lg" 
                    className="w-full"
                  >
                    {submitting ? 'Đang gửi...' : 'Gửi tin nhắn'}
                  </Button>
                </form>
              )}
        </div>

        {/* Contact Info */}
        <div className="bg-white border-2 border-black rounded-xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">Thông tin liên hệ</h2>
              <div className="space-y-6">
                {personalInfo?.email && (
                  <div>
                    <div className="flex items-center mb-2">
                      <Mail size={20} className="mr-2 text-black" />
                      <span className="font-medium text-black">Email</span>
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
                    <h3 className="font-medium mb-4 text-lg text-black">Liên kết mạng xã hội</h3>
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
    </MainLayout>
  )
}

