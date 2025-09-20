import { useGitHubStars } from '../hooks/useGitHubStars';

const GitHubStars = ({ owner, repo, className = "" }) => {
  const { stars, loading, error } = useGitHubStars(owner, repo);

  if (loading) {
    return (
      <div style={{ '--star-color': '#858585' }} className="dark:[--star-color:#9A9CA1]">
        <a 
          href={`https://github.com/${owner}/${repo}/stargazers`}
          target="_blank"
          rel="noopener noreferrer"
           className={`group flex items-center gap-1 transition-colors ${className}`}
          title={`Give ${owner}/${repo} a star on GitHub`}
        >
         <span className="text-sm font-mono animate-pulse translate-y-0.5" style={{ color: 'var(--star-color)' }}>...</span>
         <div className="relative w-3 h-3 animate-pulse group-hover:scale-110 transition-transform">
          <svg className="w-3 h-3 group-hover:hidden" viewBox="0 0 568 568" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M372.333 181.758L300.173 27.6336C293.743 13.8996 274.256 13.8999 267.826 27.6339L195.667 181.758L32.5193 206.748C18.1446 208.949 12.2753 226.527 22.4303 236.96L141.075 358.87L113.258 529.83C110.857 544.587 126.481 555.623 139.533 548.39L284 468.33L428.466 548.39C441.52 555.623 457.143 544.587 454.743 529.83L426.926 358.87L545.57 236.96C555.723 226.527 549.853 208.949 535.48 206.748L372.333 181.758Z" stroke="var(--star-color)" strokeWidth="33.3333" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <svg className="w-3 h-3 hidden group-hover:block" viewBox="0 0 568 568" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M372.333 181.758L300.173 27.6336C293.743 13.8996 274.256 13.8999 267.826 27.6339L195.667 181.758L32.5193 206.748C18.1446 208.949 12.2753 226.527 22.4303 236.96L141.075 358.87L113.258 529.83C110.857 544.587 126.481 555.623 139.533 548.39L284 468.33L428.466 548.39C441.52 555.623 457.143 544.587 454.743 529.83L426.926 358.87L545.57 236.96C555.723 226.527 549.853 208.949 535.48 206.748L372.333 181.758Z" stroke="#FFD700" strokeWidth="33.3333" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        </a>
      </div>
    );
  }

  if (error) {
    return null; // No mostrar nada si hay error
  }

  return (
    <div style={{ '--star-color': '#858585' }} className="dark:[--star-color:#9A9CA1]">
      <a 
        href={`https://github.com/${owner}/${repo}/stargazers`}
        target="_blank"
        rel="noopener noreferrer"
         className={`group flex items-center gap-1 transition-colors ${className}`}
        title={`Give ${owner}/${repo} a star on GitHub`}
      >
       <span className="text-sm font-mono translate-y-0.5" style={{ color: 'var(--star-color)' }}>{stars}</span>
        <div className="relative w-3 h-3 group-hover:scale-110 transition-transform">
        <svg className="w-3 h-3 group-hover:hidden" viewBox="0 0 568 568" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M372.333 181.758L300.173 27.6336C293.743 13.8996 274.256 13.8999 267.826 27.6339L195.667 181.758L32.5193 206.748C18.1446 208.949 12.2753 226.527 22.4303 236.96L141.075 358.87L113.258 529.83C110.857 544.587 126.481 555.623 139.533 548.39L284 468.33L428.466 548.39C441.52 555.623 457.143 544.587 454.743 529.83L426.926 358.87L545.57 236.96C555.723 226.527 549.853 208.949 535.48 206.748L372.333 181.758Z" stroke="var(--star-color)" strokeWidth="33.3333" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <svg className="w-3 h-3 hidden group-hover:block" viewBox="0 0 568 568" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M372.333 181.758L300.173 27.6336C293.743 13.8996 274.256 13.8999 267.826 27.6339L195.667 181.758L32.5193 206.748C18.1446 208.949 12.2753 226.527 22.4303 236.96L141.075 358.87L113.258 529.83C110.857 544.587 126.481 555.623 139.533 548.39L284 468.33L428.466 548.39C441.52 555.623 457.143 544.587 454.743 529.83L426.926 358.87L545.57 236.96C555.723 226.527 549.853 208.949 535.48 206.748L372.333 181.758Z" stroke="#FFD700" strokeWidth="33.3333" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      </a>
    </div>
  );
};

export default GitHubStars;
