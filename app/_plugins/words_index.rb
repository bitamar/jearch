module Reading
  class Generator < Jekyll::Generator
    def generate(site)
      words_index = Hash.new
      posts_index = Array.new

      site.posts.to_enum.with_index(0).each do |post, i|
      posts_index.push([post.title, post.url]);
        post.content.downcase.gsub('-', ' ').gsub(/[^a-z\s]/i, '').split.uniq.sort.each do |word|
          if word.length < 2
            next
          end

          if !words_index.has_key?(word)
            words_index[word] = Array.new
          end
          words_index[word].push(i)
        end
      end

      File.write('posts.json', posts_index.to_json)
      File.write('words.json', words_index.to_json)
    end
  end
end