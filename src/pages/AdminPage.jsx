import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Lock, LogOut, Users, FileText, Phone, Mail, Calendar,
  TrendingUp, Clock, CheckCircle, XCircle, MessageCircle,
  Eye, Trash2, ExternalLink, Monitor, Smartphone, Globe,
  BarChart3, MousePointer, Sheet
} from 'lucide-react';
import { verifyPassword, createSession, isSessionValid, clearSession } from '../utils/auth';
import { getEnquiries, getEnquiryStats, updateEnquiryStatus, deleteEnquiry } from '../utils/enquiryStorage';
import { getVisitorStats, getStoredVisits } from '../services/visitorTracking';
import { isGoogleSheetsConfigured } from '../services/googleSheetsSubmit';
import { companyInfo } from '../data/companyInfo';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [enquiries, setEnquiries] = useState([]);
  const [stats, setStats] = useState(null);
  const [visitorStats, setVisitorStats] = useState(null);
  const [activeTab, setActiveTab] = useState('enquiries'); // 'enquiries' or 'visitors'
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [sheetsConfigured, setSheetsConfigured] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check existing session
    if (isSessionValid()) {
      setIsAuthenticated(true);
      loadData();
    }
    setSheetsConfigured(isGoogleSheetsConfigured());
    setIsLoading(false);
  }, []);

  const loadData = () => {
    setEnquiries(getEnquiries());
    setStats(getEnquiryStats());
    setVisitorStats(getVisitorStats());
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const isValid = await verifyPassword(password);
    
    if (isValid) {
      createSession();
      setIsAuthenticated(true);
      loadData();
    } else {
      setError('Invalid password. Please try again.');
    }
    
    setPassword('');
    setIsLoading(false);
  };

  const handleLogout = () => {
    clearSession();
    setIsAuthenticated(false);
    setEnquiries([]);
    setStats(null);
  };

  const handleStatusChange = (id, newStatus) => {
    updateEnquiryStatus(id, newStatus);
    loadData();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      deleteEnquiry(id);
      loadData();
      setSelectedEnquiry(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'contacted': return 'bg-yellow-100 text-yellow-700';
      case 'converted': return 'bg-green-100 text-green-700';
      case 'closed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-brand-teal border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="text-brand-teal" size={32} />
              </div>
              <h1 className="text-2xl font-heading font-bold text-slate-800">Admin Access</h1>
              <p className="text-slate-500 text-sm mt-1">Enter password to continue</p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="input-field text-center text-lg tracking-widest"
                  autoFocus
                  required
                />
                {error && (
                  <p className="text-red-500 text-sm text-center mt-2">{error}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || !password}
                className="btn-primary w-full disabled:opacity-50"
              >
                {isLoading ? 'Verifying...' : 'Access Dashboard'}
              </button>
            </form>

            <p className="text-center text-xs text-slate-400 mt-6">
              Unauthorized access is prohibited
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-teal rounded-lg flex items-center justify-center">
              <Lock className="text-white" size={20} />
            </div>
            <div>
              <h1 className="font-heading font-bold text-slate-800">Admin Dashboard</h1>
              <p className="text-xs text-slate-500">Apex ScrewBolta</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-600 hover:text-red-600 transition-colors"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Google Sheets Status Banner */}
        {!sheetsConfigured && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
            <Sheet className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-amber-800 font-medium">Google Sheets Not Configured</p>
              <p className="text-amber-700 text-sm mt-1">
                Set up Google Sheets to save all enquiries and visitor data automatically.{' '}
                <a href="/SETUP_GUIDE.md" className="underline font-medium">View Setup Guide</a>
              </p>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="text-blue-600" size={20} />
              </div>
              <span className="text-slate-600 text-sm">Total Enquiries</span>
            </div>
            <p className="text-3xl font-bold text-slate-800">{stats?.total || 0}</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-green-600" size={20} />
              </div>
              <span className="text-slate-600 text-sm">New Today</span>
            </div>
            <p className="text-3xl font-bold text-slate-800">{stats?.today || 0}</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="text-purple-600" size={20} />
              </div>
              <span className="text-slate-600 text-sm">Total Visitors</span>
            </div>
            <p className="text-3xl font-bold text-slate-800">{visitorStats?.uniqueVisitors || 0}</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="text-yellow-600" size={20} />
              </div>
              <span className="text-slate-600 text-sm">Pending</span>
            </div>
            <p className="text-3xl font-bold text-slate-800">{stats?.byStatus?.new || 0}</p>
          </div>
        </div>

        {/* Visitor Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-brand-teal to-brand-teal/80 rounded-xl p-5 text-white">
            <div className="flex items-center gap-3 mb-3">
              <MousePointer className="opacity-80" size={20} />
              <span className="text-white/80 text-sm">Today's Visits</span>
            </div>
            <p className="text-3xl font-bold">{visitorStats?.todayVisits || 0}</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Monitor className="text-indigo-600" size={20} />
              </div>
              <span className="text-slate-600 text-sm">Desktop</span>
            </div>
            <p className="text-3xl font-bold text-slate-800">{visitorStats?.byDevice?.desktop || 0}</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <Smartphone className="text-pink-600" size={20} />
              </div>
              <span className="text-slate-600 text-sm">Mobile</span>
            </div>
            <p className="text-3xl font-bold text-slate-800">{visitorStats?.byDevice?.mobile || 0}</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-emerald-600" size={20} />
              </div>
              <span className="text-slate-600 text-sm">Converted</span>
            </div>
            <p className="text-3xl font-bold text-slate-800">{stats?.byStatus?.converted || 0}</p>
          </div>
        </div>

        {/* Traffic Sources */}
        {visitorStats?.bySource && Object.keys(visitorStats.bySource).length > 0 && (
          <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
            <h2 className="font-heading font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Globe size={18} className="text-brand-teal" />
              Traffic Sources
            </h2>
            <div className="flex flex-wrap gap-3">
              {Object.entries(visitorStats.bySource).map(([source, count]) => (
                <div key={source} className="bg-slate-50 px-4 py-2 rounded-lg">
                  <span className="capitalize text-slate-700 font-medium">{source}</span>
                  <span className="ml-2 text-brand-teal font-bold">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="bg-white rounded-xl p-5 shadow-sm mb-8">
          <h2 className="font-heading font-bold text-slate-800 mb-4 flex items-center gap-2">
            <BarChart3 size={18} className="text-brand-teal" />
            Analytics & Data
          </h2>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://docs.google.com/spreadsheets"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                sheetsConfigured 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
              }`}
            >
              <Sheet size={16} />
              Google Sheets {sheetsConfigured ? '(Connected)' : '(Setup Required)'}
              <ExternalLink size={14} />
            </a>
            <a
              href="https://analytics.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-slate-100 hover:bg-brand-teal hover:text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              <BarChart3 size={16} />
              Google Analytics
              <ExternalLink size={14} />
            </a>
            <a
              href="https://clarity.microsoft.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-slate-100 hover:bg-brand-teal hover:text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              <Eye size={16} />
              Microsoft Clarity
              <ExternalLink size={14} />
            </a>
            <a
              href="https://mail.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-slate-100 hover:bg-brand-teal hover:text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              <Mail size={16} />
              Gmail Inbox
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'enquiries'
                ? 'bg-brand-teal text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <FileText size={16} className="inline mr-2" />
            Enquiries ({stats?.total || 0})
          </button>
          <button
            onClick={() => setActiveTab('visitors')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'visitors'
                ? 'bg-brand-teal text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Users size={16} className="inline mr-2" />
            Recent Visitors ({visitorStats?.totalVisits || 0})
          </button>
        </div>

        {/* Enquiries Table */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h2 className="font-heading font-bold text-slate-800">Recent Enquiries</h2>
              <p className="text-sm text-slate-500">
                {sheetsConfigured ? 'Synced to Google Sheets' : 'Stored locally on this device'}
              </p>
            </div>

            {enquiries.length === 0 ? (
              <div className="p-12 text-center">
                <FileText className="mx-auto text-slate-300 mb-4" size={48} />
                <p className="text-slate-500">No enquiries yet</p>
                <p className="text-sm text-slate-400">Enquiries will appear here when customers submit forms</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Date</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Name</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Company</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Mobile</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Type</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {enquiries.map((enquiry) => (
                      <tr key={enquiry.id} className="hover:bg-slate-50">
                        <td className="px-5 py-4 text-sm text-slate-600">
                          {formatDate(enquiry.timestamp)}
                        </td>
                        <td className="px-5 py-4 text-sm font-medium text-slate-800">
                          {enquiry.name}
                        </td>
                        <td className="px-5 py-4 text-sm text-slate-600">
                          {enquiry.company}
                        </td>
                        <td className="px-5 py-4 text-sm">
                          <a href={`tel:${enquiry.mobile}`} className="text-brand-teal hover:underline">
                            {enquiry.mobile}
                          </a>
                        </td>
                        <td className="px-5 py-4 text-sm text-slate-600 capitalize">
                          {enquiry.formType?.replace('_', ' ')}
                        </td>
                        <td className="px-5 py-4">
                          <select
                            value={enquiry.status}
                            onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                            className={`text-xs font-medium px-2 py-1 rounded-full border-0 ${getStatusColor(enquiry.status)}`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="converted">Converted</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedEnquiry(enquiry)}
                              className="p-1.5 text-slate-400 hover:text-brand-teal hover:bg-brand-teal/10 rounded"
                              title="View Details"
                            >
                              <Eye size={16} />
                            </button>
                            <a
                              href={`https://wa.me/91${enquiry.mobile}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded"
                              title="WhatsApp"
                            >
                              <MessageCircle size={16} />
                            </a>
                            <button
                              onClick={() => handleDelete(enquiry.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Visitors Table */}
        {activeTab === 'visitors' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h2 className="font-heading font-bold text-slate-800">Recent Visitors</h2>
              <p className="text-sm text-slate-500">
                {sheetsConfigured ? 'Synced to Google Sheets' : 'Stored locally - configure Google Sheets for permanent storage'}
              </p>
            </div>

            {!visitorStats || visitorStats.totalVisits === 0 ? (
              <div className="p-12 text-center">
                <Users className="mx-auto text-slate-300 mb-4" size={48} />
                <p className="text-slate-500">No visitor data yet</p>
                <p className="text-sm text-slate-400">Visitor tracking starts when users visit your website</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Time</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Page</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Device</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Browser</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Source</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Visits</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {getStoredVisits().slice(0, 50).map((visit, index) => (
                      <tr key={visit.visitorId + '-' + index} className="hover:bg-slate-50">
                        <td className="px-5 py-4 text-sm text-slate-600">
                          {visit.timestamp}
                        </td>
                        <td className="px-5 py-4 text-sm text-slate-800">
                          {visit.page || '/'}
                        </td>
                        <td className="px-5 py-4 text-sm">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            visit.device === 'mobile' ? 'bg-pink-100 text-pink-700' :
                            visit.device === 'tablet' ? 'bg-purple-100 text-purple-700' :
                            'bg-indigo-100 text-indigo-700'
                          }`}>
                            {visit.device === 'mobile' ? <Smartphone size={12} /> : <Monitor size={12} />}
                            {visit.device}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-sm text-slate-600">
                          {visit.browser}
                        </td>
                        <td className="px-5 py-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            visit.source === 'google' ? 'bg-blue-100 text-blue-700' :
                            visit.source === 'direct' ? 'bg-gray-100 text-gray-700' :
                            visit.source === 'whatsapp' ? 'bg-green-100 text-green-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {visit.source}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-sm text-slate-600">
                          {visit.visitCount || 1}
                          {visit.isNewVisitor && (
                            <span className="ml-2 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">New</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-heading font-bold text-slate-800">Enquiry Details</h3>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <XCircle size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs text-slate-500 uppercase">Date</label>
                <p className="text-slate-800">{formatDate(selectedEnquiry.timestamp)}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 uppercase">Name</label>
                  <p className="text-slate-800 font-medium">{selectedEnquiry.name}</p>
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase">Company</label>
                  <p className="text-slate-800">{selectedEnquiry.company}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 uppercase">Mobile</label>
                  <a href={`tel:${selectedEnquiry.mobile}`} className="text-brand-teal block">
                    {selectedEnquiry.mobile}
                  </a>
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase">Email</label>
                  <p className="text-slate-800">{selectedEnquiry.email || '-'}</p>
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-500 uppercase">Requirement</label>
                <p className="text-slate-800 bg-slate-50 p-3 rounded-lg mt-1">
                  {selectedEnquiry.requirement || selectedEnquiry.message || '-'}
                </p>
              </div>
              {selectedEnquiry.preferredDate && (
                <div>
                  <label className="text-xs text-slate-500 uppercase">Preferred Date</label>
                  <p className="text-slate-800">{selectedEnquiry.preferredDate}</p>
                </div>
              )}
              <div className="flex gap-3 pt-4">
                <a
                  href={`tel:${selectedEnquiry.mobile}`}
                  className="btn-primary flex-1 justify-center"
                >
                  <Phone size={16} />
                  Call
                </a>
                <a
                  href={`https://wa.me/91${selectedEnquiry.mobile}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp flex-1 justify-center"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
